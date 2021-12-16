const client = require('./Socket').socket


const ReceiveMessage = (callback) => {

    client.on('receiveMessage', function(data){
        console.log("received ", data.message);
        callback(data);
    });
}

 
export const receiveMessage = (callback) => {
    ReceiveMessage(callback);
};