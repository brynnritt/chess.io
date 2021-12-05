import client from 'socket.io-client';
const URL = "http://localhost:3001";

const socket = client(URL);

socket.on('connect_failed', function() {
    console.log("connection failed");
})

export {
    socket
}
