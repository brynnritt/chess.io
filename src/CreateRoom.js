
const client = require('./Socket').socket


/*var response = '';

client.on('createRoom', data => {
    response = data;
    console.log("server response " + response.roomId);
});*/

const CreateRoom = (gameCode, callback) => {
    var response = '';

    client.emit('createRoom', {roomId: gameCode}, function(data){
        response = data;
        console.log("server response " + response.roomId);
        callback(response);

    });

    return ( response );
}

 
export const createRoom = (gameCode, callback) => {
    CreateRoom(gameCode, callback);
};