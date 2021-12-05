import { useState } from "react";
import { Link } from "react-router-dom";
import { createRoom } from "./CreateRoom";


const WelcomeScreen = () => {
    const [gameCode, setGameCode] = useState('');
    const [joinGame, setJoinGame] = useState(false);
    const [directions, setDirections] = useState('');
    // when true, renders createRoom component to start creating game
    const [roomCreated, setRoomCreated] = useState(false);
    //bool for when room is ready, when true render go button
    // player 1 waits for player 2 in room

    const handleCreateClick = () => {
        const newGameCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        setGameCode(newGameCode);
        setJoinGame(false);
        //setCreateGame(true);
        setDirections('Copy code and send to a friend');
        var response = createRoom(newGameCode);
        if (response) {
            setRoomCreated(true);
        }
    }

    const handleJoinClick = () => {
        setGameCode('');
        setJoinGame(true);
        setDirections('Enter code from a friend')
    }

    const handleCopyClick = () => {
        navigator.clipboard.writeText(gameCode);
        setDirections('Waiting for friend to join the game...');
    }

    const handleGoClick = () => {
        return;
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
                        onClick={ handleCopyClick }>
                        Copy
                    </button> }
                    { joinGame && 
                        <Link to={ '/game/' + gameCode } className='go-link'>
                            <button className="go-button"
                                onClick={ handleGoClick }>
                                Go
                            </button>
                        </Link>
                    }
                </form>
                
                <div className="directions">
                    <label>{ directions }</label>
                </div>
                { roomCreated && <button className="play-button">Play</button> }
            </div>
        </div>
    );
}
 
export default WelcomeScreen;