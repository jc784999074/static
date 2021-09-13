const Koa = require('koa');
const path = require('path');

const app = new Koa();

const static = require('koa-static');

app.use(static(path.join(__dirname, 'public')));

app.listen(3000);
console.log('http://127.0.0.1:3000');
console.log('[demo] start-quick is starting at port 3000');
