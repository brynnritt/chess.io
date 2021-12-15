const client = require('./Socket').socket


const ReceiveMove = (callback) => {

    client.on('receiveMove', function(data){
        console.log("received " + data.sourceSquare);
        callback(data.sourceSquare, data.targetSquare);
    });
}

 
export const receiveMove = (callback) => {
    ReceiveMove(callback);
};