const client = require('./Socket').socket


const SendMove = (gameid, source, target) => {

    client.emit('makeMove', {roomId: gameid, sourceSquare: source, targetSquare: target});
}

 
export const sendMove = (callback, source, target) => {
    SendMove(callback, source, target);
};