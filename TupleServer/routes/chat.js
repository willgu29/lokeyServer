

//Handlers *****

function onMessageReceived(socket) {
	socket.on('message', function(messageJSON){
    	console.log('message: ' + JSON.stringify(messageJSON));
    	chatRoom.sendMessage(socket, messageJSON);
  	});		
}

function onJoinThread(socket) {
	socket.on("joinThread", function(threadJSON, callback) {
		console.log("threadID: " + JSON.stringify(threadJSON));
		chatRoom.joinThread(socket, threadJSON,callback);
	});
}

//*******//


var chatRoom = {
	connection: function (io) {
		io.on('connection', function(socket){
  			console.log('a user connected');
  			onJoinThread(socket);
  			onMessageReceived(socket);

		});
	},
	sendMessage: function (socket, messageJSON) {
		socket.broadcast.to(messageJSON["toMessageThread_id"]).emit("message", messageJSON);
	},
	joinThread: function (socket, threadJSON,callback) {
		console.log("user joined thread: " + JSON.stringify(threadJSON));
		socket.join(threadJSON["threadID"], function(err) {
			callback(err);
		});
		socket.broadcast.to(threadJSON["threadID"]).emit("userJoined", threadJSON);
	}
}



module.exports = chatRoom;

