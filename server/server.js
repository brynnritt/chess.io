const app = require("express")();
const http = require('http').Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const port = 3001;
 
io.on("connection", socket => {
  console.log("New client connected");

  socket.on('createRoom', function(data, callback) {
      console.log('creating room ' + data.roomId);
      //socket.emit('createRoom', {roomId: data.roomId});
      socket.join(data.roomId);
      callback({roomId: data.roomId});
  });

  socket.on('joinRoom', function(data){
      console.log('joining room' + data.roomId);
      var room = io.sockets.adapter.room[data.roomId];
  });




  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});




http.listen(port, function(){
    console.log('listening on localhost:3001');
})
