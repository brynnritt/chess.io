import Chessboard from "chessboardjsx";

const Board = () => {
    return ( 
        <div className="board">
            <Chessboard
                width={600}
                position="start"
                /*lightSquareStyle={{ backgroundColor: '#ececec' }}
                darkSquareStyle={{ backgroundColor: '#d1bebe' }}*/
            />
        </div>
     );
}
 
export default Board;