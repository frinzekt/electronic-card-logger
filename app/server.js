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

	server.listen(3000, (err) => {
		if (err) throw err;
		console.log('> Ready on http://localhost:3000');
	});

	const io = require('socket.io')(server);
	// socket.io server
	io.on('connection', (socket) => {
		socket.on('message', (data) => {
			socket.broadcast.emit('message', data);
			console.log('Message Sent', data);
		});
		socket.on('firstConnect', (data) => {
			console.log('Client has connected');
		});
	});
});
