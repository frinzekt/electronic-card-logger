// const app = require('express')();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

// // socket.io server
// io.on('connection', (socket) => {
// 	socket.on('message', (data) => {
// 		socket.broadcast.emit('message', data);
// 		console.log('Message Sent', data);
// 	});
// 	socket.on('firstConnect', (data) => {
// 		console.log('Client has connected');
// 	});
// });
// app.get('/', (req, res) => res.send('Socket Server is Online'));

// server.listen(8000, (err) => {
// 	if (err) throw err;
// 	console.log('> Ready on http://localhost:8000');
// });

const next = require('next');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = app.getRequestHandler();

const { createServer } = require('http');
const { parse } = require('url');

app.prepare().then(() => {
	const server = createServer((req, res) => {
		const parsedUrl = parse(req.url, true);
		handler(req, res, parsedUrl);
	});
	const port = process.env.PORT || 3000;
	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});

	const io = require('socket.io').listen(server);
	// socket.io server
	io.on('connection', (socket) => {
		socket.on('message', (data) => {
			socket.broadcast.emit('message', data);
		});
		socket.on('firstConnect', (data) => {
			console.log('Client has connected');
		});
	});
});
