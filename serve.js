const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

http.createServer(function (request, response) {}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');
