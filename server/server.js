const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const bson = require('bson');

const Todo = require('./mongodb');

const ObjectId = bson.ObjectID;

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
