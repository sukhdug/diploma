const http = require('http');

http.createServer(function (req, res) {
	// write the response and send it to the client
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('Node.js says hello world!');
	res.end();
}).listen(8080);