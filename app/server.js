const app = require('express')();
const server = require('http').Server(app);
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
app.get('/', (req, res) => res.send('Socket Server is Online'));

server.listen(8000, (err) => {
	if (err) throw err;
	console.log('> Ready on http://localhost:8000');
});
