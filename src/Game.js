import React, { useEffect, useState } from "react";
//import Board from "./Board";
//import { ChessInstance } from 'chess.js';
import Chessboard from "chessboardjsx";

const Chess = require('chess.js');

const Game = () => {
    const [history, setHistory] = useState([]);
    const [chess] = useState(
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    );
    //const chess = new Chess();
    console.log("new chess");
    //const chess = new Chess();
    const [position, setPosition] = useState(chess.fen());

    const onDrop = ({sourceSquare, targetSquare}) => {
        let move = chess.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });

        if (move == null) return;
        if (move.isCastle) return;
        if (chess.game_over){

        }

        setPosition(chess.fen());
    } 
    useEffect(() => {
        setHistory(chess.history({ verbose: true }));
        return;

        // update history rendering

    }, [position]);

    return (
        <div className="game">
                <div className="board">
                <Chessboard
                    width={500}
                    position={position}
                    onDrop={onDrop}
                />
            </div>
            <div className="history-list">
                {history.map((hist) => (
                    <div className="history">
                        <h2>{hist.color}, {hist.san}</h2>
                        
                    </div>
                ))}
            </div>
        </div>
        
    );
}
 
export default Game;