const app = require("express")();
const http = require('http').Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const port = 3001;
var rooms = {}; 
//var users = {};
 
io.on("connection", socket => {
  console.log("New client connected");

  socket.on('createRoom', function(data, callback) {
      console.log('creating room ' + data.roomId);
      roomId = String(data.roomId);
      socket.join(roomId);
      callback({roomId: data.roomId});
      //console.log(io.sockets.adapter.rooms);

      rooms[data.roomId] = 1;

      color = Math.floor(Math.random() * (2 - 1 + 1) + 1)
      //socket.broadcast.to(roomId).emit('receiveColor', {color: color});
  });

  socket.on('joinRoom', function(data, callback) {
      console.log('attempting to join ' + data.roomId);
      roomId = String(data.roomId);
      roomCount = rooms[data.roomId];
      var joinedRoom = false;
      //console.log(roomCount);
      if (roomCount <= 1) {
            rooms[data.roomId]++;
            console.log('joining room ' + data.roomId);
            socket.join(roomId);
            joinedRoom = true;
      }
      io.sockets.in(roomId).emit('test', {msg: 'test message'});
      callback({ joinedRoom: joinedRoom});

  });

  socket.on("makeMove", function(data) {
      roomId = String(data.roomId);
      console.log("sending move " + data.targetSquare + " to room " + roomId);
      socket.broadcast.to(roomId).emit('receiveMove', {sourceSquare: data.sourceSquare, targetSquare: data.targetSquare});
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});




http.listen(port, function() {
    console.log('listening on localhost:3001');
})
