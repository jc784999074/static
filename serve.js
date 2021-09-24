const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./serve/middleware/router');

const app = new Koa();

// 处理post请求的数据
app.use(bodyParser());
// 此方法自动扫描controller文件夹下的js，添加一些请求:
app.use(controller());

const static = require('koa-static');

app.use(static(path.join(__dirname, 'public')));

app.listen(3000);
console.log('http://127.0.0.1:3000');
