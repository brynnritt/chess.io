const app = require("express")();
//const app = express();
const http = require('http').Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const port = 3001;
//const index = require("./routes/index");
//app.use(index);

//const server = http.createServer(app);
//const io = socketIo(server);

//try emitting a number to create room, 
io.on("connection", socket => {
  console.log("New client connected");

  socket.on('createRoom', function(roomID) {
      console.log('creating room ' + roomID);
      socket.emit('createRoom', {roomId: roomID});
  });


  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


/*
function createRoom(roomId) {
    socket.emit('createRoom', {roomId: roomId});
    console.log('roomId ' + roomId);
}*/

http.listen(port, function(){
    console.log('listening on localhost:3001');
})
//server.listen(port, () => console.log(`Listening on port ${port}`));
