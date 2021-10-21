const getFiles = require('../util/index');

const fn_index = async (ctx, next) => {
	ctx.response.body = `<h1>Index</h1>
      <form action="/signin" method="post">
          <p>Name: <input name="name" value="koa"></p>
          <p>Password: <input name="password" type="password"></p>
          <p><input type="submit" value="Submit"></p>
      </form>`;
};

const fn_signin = async (ctx, next) => {
	const name = ctx.request.body.name || '',
		password = ctx.request.body.password || '';
	console.log(`signin with name: ${name}, password: ${password}`);
	if (name === 'koa' && password === '12345') {
		ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
	} else {
		ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>`;
	}
};

const post_getPitcure = async (ctx, next) => {
	if (ctx.accepts('application/json')) {
		const imgList = getFiles.getImageFiles('./public/assets/img');
		ctx.response.body = {
			code: 1,
			result: imgList,
		};
	}
};

module.exports = {
	'GET /': fn_index,
	'POST /signin': fn_signin,
	'GET /getPicture': post_getPitcure,
};
