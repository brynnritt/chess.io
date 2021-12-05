
const socket = require('./Socket').socket


const createRoom = (gameId) => {
    const response = '';

    socket.emit('createGame', gameId)

    socket.on('createGame', data => {
        response = data;
        console.log(response);
    })
 
    return ( response );
}
 
export default createRoom;