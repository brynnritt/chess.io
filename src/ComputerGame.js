import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chessboard from "chessboardjsx";
const client = require('./Socket').socket;
const STOCKFISH = window.STOCKFISH;

const Chess = require('chess.js');

const Game = () => {
   
    const [history, setHistory] = useState([]);
    const [chess] = useState(
        new Chess()
    );
    const [position, setPosition] = useState(chess.fen());
    const [isWhite, setIsWhite] = useState(false);
    const [orientation, setOrientation] = useState('b');
    const [engineIsRunning, setEngineIsRunning] = useState();

    var engine =
      typeof STOCKFISH === "function"
        ? STOCKFISH()
        : new Worker("stockfish.js");

    

    useEffect(() => {
        CreateEngine();
        //const color = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        const color = 1;
        if (color == 1){
            setIsWhite(true)
        }
    });

    useEffect(() => {
        setHistory(chess.history({ verbose: true }));
    }, [position]);

    const uciCmd = cmd => {
        engine.postMessage(cmd);
    }

    const CreateEngine = () => {
        
        uciCmd('uci');
        uciCmd('ucinewgame');
    }

    const EngineMove = () => {
        //var fen = chess.fen() 
        var moves = '';
        for(var i = 0; i < history.length; ++i) {
            var move = history[i];
            moves += ' ' + move.from + move.to + (move.promotion ? move.promotion : '');
        }
        uciCmd('position startpos moves' + moves);
        uciCmd('go depth 10');
    }

    engine.onmessage = function(event) {
        console.log("on message called");
    }

    const onDrop = ({ sourceSquare, targetSquare }) => {
        if ((chess.turn() == 'w' && isWhite) || (chess.turn() == 'b' && !isWhite)){
            chess.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q"
            });
            
            setPosition(chess.fen());
            EngineMove();
        }
    } 

    return (
        <div className="game-board">
            <div className="board">
                <Chessboard
                    width={600}
                    position={ position }
                    onDrop={ onDrop }
                    orientation={ orientation }
                />
            </div>
            <div className="history">
                <h3>MOVES</h3>
                <ul className="history-list">
                    {history.map((hist) => (
                        <li>{ hist.color }, { hist.san }</li>
                    ))}
                </ul>
            </div>
        </div>
        
    );
}
 
export default Game;