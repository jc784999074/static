var http = axios.create({});
http.interceptors.request.use(
	function (config) {
		if (config.url.includes('api.kmf.com')) {
			if (process.client) {
				config.headers.common['Authorization'] = 'Bearer ' + VueCookie.get('FDX_token');
			}
			config.headers.common['Q-Organization'] = 'kaoyan';
		}
		return config;
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);
http.interceptors.response.use(
	function (res) {
		if (res.data.code == 1) {
			return res.data.result;
		} else {
			return Promise.reject(res.data);
		}
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);
window.g_global = window.g_global || {};
window.g_global.axios = http;
