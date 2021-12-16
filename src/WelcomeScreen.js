import { useState } from "react";
import { Link } from "react-router-dom";
import { createRoom } from "./CreateRoom";
import { joinRoom } from "./JoinRoom";


const WelcomeScreen = () => {
    const [gameCode, setGameCode] = useState('');
    const [joinGame, setJoinGame] = useState(false);
    const [directions, setDirections] = useState('');
    // when true, rendered join game button
    const [roomCreated, setRoomCreated] = useState(false);
    // room creator will have userId of 1
    const [userId, setUserId] = useState(0);
    const [roomJoined, setRoomJoined] = useState(false);
    const [optionSelected, setOptionSelected] = useState(false);


    const handleRoomCreated = (response) => {
        if (response) {
            setRoomCreated(true);
        }
    }
    
    const handleRoomJoined = (response) => {
        if (response) {
            setRoomJoined(true);
        }
    }

    const handleCreateClick = () => {
        const newGameCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        setGameCode(newGameCode);
        setJoinGame(false);
        setDirections('Copy code and send to a friend');
        setUserId(1);
        setOptionSelected(true);
    }

    const handleJoinClick = () => {
        setGameCode('');
        setJoinGame(true);
        setDirections('Enter code from a friend');
        setUserId(2);
        setOptionSelected(true);
    }

    const handleCopyClick = () => {
        navigator.clipboard.writeText(gameCode);
        setDirections('Copied!');
    }

    const handleGoClick = () => {
        return;
    }

    const handlePlayClick = () => {
        if(userId == 1) createRoom(gameCode, handleRoomCreated);
        else joinRoom(gameCode, handleRoomJoined);
    }

    return (  
        <div className="welcome-screen">
            <div className="code-box">
                <div className="buttons">
                    <button 
                        className="create-game-button"
                        onClick={ handleCreateClick }>
                        Create Game
                    </button>
                    <button 
                        className="join-game-button"
                        onClick={ handleJoinClick }>
                        Join Game
                    </button>
                </div>
                <form>
                    <input
                        className="game-code-box"
                        type="text"
                        readOnly = { !joinGame }
                        value={ gameCode }
                        onChange = { (e) => setGameCode(e.target.value) }
                    />
                    { !joinGame && <button 
                        className="copy-button"
                        type="button"
                        onClick={ handleCopyClick }>
                        Copy
                    </button> }
                    { joinGame && <button 
                        className="hidden-button"
                        type="button">
                    </button> }
                </form>
                
                
                { /*(roomCreated || roomJoined) && <Link to={'/game/' + gameCode}> <button className="play-button">Play</button> </Link> */}
                <div className="play">
                    { optionSelected && <Link to={'/game/' + gameCode + '/' + userId}> <button className="play-button" onClick={ handlePlayClick }>Play</button> </Link> }
                    <div className="directions">
                        <label>{ directions }</label>
                    </div>
                </div>
                
                
            </div>
        </div>
    );
}
 
export default WelcomeScreen;