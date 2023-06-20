const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	socket.on('login', (username, callback) => {
    // Store the username on the socket object
    socket.username = username;

    io.emit('login', true); // Emit the 'login' event to the current client
    callback(true); // Invoke the callback with success flag
  });

	socket.on('send name', (username) => {
		io.emit('send name', username);
	});

	socket.on('send message', (chat) => {
		io.emit('send message', chat);
	});
});

server.listen(port, () => {
	console.log(`Server is listening at the port: ${port}`);
});
