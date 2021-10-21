const got = require('got');

var fn_hello = async (ctx, next) => {
	var name = ctx.params.name;
	ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};
var fn_talk = async (ctx, next) => {
	var string = ctx.querystring;

	const response = await got(`http://api.qingyunke.com/api.php?${string}`, {
		method: 'GET',
		prefixUrl: '',
	});
	ctx.response.body = response.body;
};

module.exports = {
	'GET /hello/:name': fn_hello,
	'GET /talk': fn_talk,
};
