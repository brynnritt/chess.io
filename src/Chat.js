import React, { useEffect, useState } from "react";

import { receiveMessage } from './ReceiveMessage';
const client = require('./Socket').socket


const Chat = ({ gameCode }) => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    var messageList = [];

    useEffect(() => {
        receiveMessage(handleReceiveMessage)
    });
    
    const handleReceiveMessage = (data) => {
        console.log("message received in chat ", data.message);
        messageList.push(data.message);
        setMessages(messageList);

    }

    const handleSendMessage = (e) => {
        console.log(gameCode);
        messageList.push(message);
        setMessages(messageList);
        client.emit('sendMessage', {message: message, roomId: gameCode});
        
        setMessage('');

        
    }
    
    return ( 
        <div className="chat">
            <head>
            <title>Socket.IO chat</title>
        </head>
        <body>
            <ul className="messages-list">
                { messages.map((msg) => (
                    <li>{ msg }</li>
                ))}
            </ul>
            <div className="form">
            <input className="message-input" value={ message } autocomplete="off" 
                onChange={ (e) => setMessage(e.target.value) }/>
            <button onClick={ handleSendMessage }>Send</button>
            </div>
                

        </body>
        </div>
        
     );
}
 
export default Chat;