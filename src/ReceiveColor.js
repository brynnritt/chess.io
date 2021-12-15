const client = require('./Socket').socket


const ReceiveColor = (callback) => {

    client.on('receiveColor', function(data){
        console.log('received', data.color)
        callback()
    })
}

 
export const receiveColor = (callback) => {
    ReceiveColor(callback);
};
