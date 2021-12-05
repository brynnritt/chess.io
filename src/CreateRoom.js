
const client = require('./Socket').socket


const CreateRoom = (gameCode) => {
    const response = '';

    client.emit('createRoom', gameCode);

    client.on('createRoom', data => {
        response = data.gameId;
        console.log("server response" + response);
    })
 
    return ( response );
}
 
export const createRoom = (gameCode) => {
    CreateRoom(gameCode);
};