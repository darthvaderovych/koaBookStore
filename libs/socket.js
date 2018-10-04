let socketIO = require('socket.io');

const Message = require('../models/message');





function socket(server) {

	let io = socketIO(server);

	let users = [];
	let connections = [];


	io.on('connection', async function(socket) {
		connections.push(socket);
		console.log('Connected: %s sockets connected', connections.length);	

		try {
			var msgHistory = await Message.find();
			if (msgHistory) {
				socket.emit('chat history', msgHistory);
			}

		} catch(e) {
			console.error(e);
		}
		

		socket.on('disconnect', function(data) {
			users.splice(users.indexOf(socket.username), 1)
			updateUsernames();
			connections.splice(connections.indexOf(socket), 1);
			console.log('Diconnected: %s sockets connected', connections.length);
		});

		socket.on('send message', async function(data) {
			io.emit('new message', {msg: data, user: socket.username});

				try {
					var msg = new Message ({
						nickname: socket.username,
						message: data
					});

					let newMsg = await msg.save();
					console.log(newMsg); 
				} catch (e) {
					console.error(e);
				}
		});


		socket.on('new user', function(data, callback){
			callback(true);
			socket.username = data;
			users.push(socket.username);
			updateUsernames();
		});

		function updateUsernames() {
			io.emit('get users', users);
		}
	});
};

module.exports = socket;