import client from "socket.io-client"
const URL = "http://localhost:3000";

const socket = client(URL);

export {
    socket
}
