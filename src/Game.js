import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chessboard from "chessboardjsx";
import { receiveMove } from "./ReceiveMove";
import { sendMove } from "./SendMove";
import { receiveColor } from "./ReceiveColor";
const client = require('./Socket').socket


const Chess = require('chess.js');

const Game = () => {
    const { gameid } = useParams();
    const { userid } = useParams();
    const [history, setHistory] = useState([]);
    const [chess] = useState(
        new Chess()
    );
    const [message, setMessage] = useState('');
    const [position, setPosition] = useState(chess.fen());
    const [colorReceived, setColorReceived] = useState(false);
    const [isWhite, setIsWhite] = useState(false);
    const [orientation, setOrientation] = useState('black');

    useEffect(() => {
        //receiveColor(handleReceiveColor);
        if(userid == 1){
            setIsWhite(true)
            setOrientation('white')
        }

        receiveMove(handleReceiveMove);

        client.on('test', function(data) {
            setMessage(data.msg);
        })
        
    });

    useEffect(() => {
        setHistory(chess.history({ verbose: true }));
    }, [position]);

    const handleReceiveColor = (color) => {
        //maybe add a delay if msg popps up for like a second
        if (color == 1){
            setIsWhite(true)
        }
        else {
            setIsWhite(false)
        }
        setColorReceived(true)
    }

    const handleReceiveMove = (source, target) => {
        console.log("handle move " + target);
        chess.move({ from: source, to: target, promotion: "q" }); // check for checkmate
        setPosition(chess.fen());
    }  

    const handleTest = (msg) => {
        setMessage(msg);
        setPosition(chess.fen());
    }

    const onDrop = ({ sourceSquare, targetSquare }) => {
        console.log("turn ", chess.turn(), " color is white? ", isWhite);
        if ((chess.turn() == 'w' && isWhite) || (chess.turn() == 'b' && !isWhite)){
            let move = chess.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q"
            });
    
            console.log(chess.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q"
            }));
    
            if (move == null) return;
            setPosition(chess.fen());
            sendMove(gameid, sourceSquare, targetSquare);
        }
    } 

    

    return (
        <div className="game">
            <div className="board">
                <Chessboard
                    width={500}
                    position={ position }
                    onDrop={ onDrop }
                    orientation={ orientation }
                />
            </div>
            <div className="history-list">
                {history.map((hist) => (
                    <div className="history">
                        <h2>{ hist.color }, { hist.san }</h2>
                    </div>
                ))}
            </div>
            <h2>{ message }</h2>
        </div>
        
    );
}
 
export default Game;