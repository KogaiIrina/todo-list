import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import Router from 'koa-router';
import bson from 'bson';
import bcrypt from 'bcrypt';

import { Todo, User } from './mongodb';
import SessionStorage from './SessionStorage';

const ObjectId = bson.ObjectID;
const SALT = '$2a$10$7h/0RT4RG5eX3602o3/.aO.RYkxKuhGkzvIXHLUiMJlFt1P.6Pe';
const ONE_WEEK_MS = 1000 * 60* 60 * 24 * 7;
const SESSION_STORAGE = new SessionStorage();

SESSION_STORAGE.startExpirationInterval(ONE_WEEK_MS);

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
  const user = await User.findOne({ nickname: ctx.request.body.nickname });
  ctx.assert(user, 401);

  const match = await bcrypt.compare(ctx.request.body.password, user.password);
  ctx.assert(match, 401);
  
  const session = SESSION_STORAGE.createSession(user._id);
  ctx.cookies.set('session', session);
  ctx.status = 200;
});

app
  .use(cors({
    allowHeaders: '*',
    keepHeadersOnError: true
  }))
  .use(bodyParser({ enableTypes: ['json', 'form', 'text'] }))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);
