import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import bson from 'bson';
import bcrypt from 'bcrypt';

import { Todo, User } from './mongodb';
import SessionStorage from './SessionStorage';

const ObjectId = bson.ObjectID;
const SALT = '$2a$10$7h/0RT4RG5eX3602o3/.aO.RYkxKuhGkzvIXHLUiMJlFt1P.6Pe';
const SESSION_STORAGE = new SessionStorage();

const app = new Koa();
const router = new Router();

router.get('/todos', async ctx => {
  ctx.body = JSON.stringify(await Todo.find().exec());
});

router.post('/todo', async ctx => {
  const todo = new Todo({ summary: ctx.request.body });
  await todo.save();
  ctx.body = JSON.stringify(todo);
});

router.delete('/todo/:id', async ctx => {
  const toDeleteId = new ObjectId(ctx.params.id);
  await Todo.deleteOne({ _id: toDeleteId });
  ctx.body = '{ "status": "OK" }';
});

router.patch('/todo/:id', async ctx => {
  const res = await Todo.updateOne(
    { _id: new ObjectId(ctx.params.id) },
    ctx.request.body
  );
    if (!res.n) {
      ctx.throw(400);
    } else {
      ctx.body = '{ "status": "OK" }';
    }
});

router.post('/register', async ctx => {
  const newUser = new User({
    nickname: ctx.request.body.nickname,
    password: await bcrypt.hash(ctx.request.body.password, SALT)
  });
  await newUser.save();
});

router.post('/login', async ctx => {
  //поиск пользователя в базе данных User по nickname
  const user = await User.findOne({ nickname: ctx.request.body.nickname });
  //выбрасываем ошибку, если user с передаваемым nickname не найден
  ctx.assert(user, 401, 'Invalid nickname or password. Please, try again!');
  //проверяем пароли на соответствие
  const hash = await bcrypt.hash(ctx.request.body.password, SALT);
  const match = await bcrypt.compare(user.password, hash);
  //если пароли совпали, устанавливаем cookie

  ctx.assert(match, 401, 'Invalid password!');

  let cookie = SESSION_STORAGE.createSession(user._id);
  ctx.cookies.set(cookie, { signed: true });
});

app
  .use(bodyParser({ enableTypes: ['json', 'form', 'text'] }))
  .use(async (ctx, next) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');
    ctx.response.set('Access-Control-Allow-Methods', '*');
    ctx.response.set('Access-Control-Allow-Headers', '*');
    ctx.response.set('Content-Type', 'application/json');
    await next();
  })
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);





