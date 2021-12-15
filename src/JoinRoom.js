const client = require('./Socket').socket


const JoinRoom = (gameCode, callback) => {
    var response = '';

    client.emit('joinRoom', {roomId: gameCode}, function(data){
        response = data;
        console.log("server response " + response.roomId);
        callback(response);

    });

    return ( response );
}

 
export const joinRoom = (gameCode, callback) => {
    JoinRoom(gameCode, callback);
};