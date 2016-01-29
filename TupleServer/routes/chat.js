

//Handlers *****

function onMessageReceived(io, socket) {
	socket.on('message', function(messageJSON){
    	console.log('message: ' + JSON.stringify(messageJSON));
    	chatRoom.sendMessage(io, messageJSON);
  	});		
}

function onJoinThread(io, socket) {
	socket.on("joinThread", function(threadIDJSON, callback) {
		console.log("threadID: " + JSON.stringify(threadIDJSON));
		chatRoom.joinThread(io, socket,threadIDJSON,callback);
	});
}

//*******//


var chatRoom = {
	connection: function (io) {
		io.on('connection', function(socket){
  			console.log('a user connected');
  			onJoinThread(io, socket);
  			onMessageReceived(io, socket);

		});
	},
	sendMessage: function (io, messageJSON) {
		io.broadcast.to(messageJSON["toMessageThread_id"]).emit("message", messageJSON);
	},
	joinThread: function (io, socket,threadJSON,callback) {
		console.log("user joined thread: " + JSON.stringify(threadJSON));
		socket.join(threadJSON["threadID"], function(err) {
			callback(err);
		});
		io.broadcast.to(threadJSON["threadID"]).emit("userJoined", threadJSON);
	}
}



module.exports = chatRoom;

