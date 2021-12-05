const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 3001;
//const index = require("./routes/index");
//app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

//try emitting a number to create room, 
io.on("connection", (socket) => {
  console.log("New client connected");



  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

io.on('createRoom', createRoom)

function createRoom() {
    socket.emit('createRoom', {roomId: roomId});
    console.log(roomId)
}

server.listen(port, () => console.log(`Listening on port ${port}`));
