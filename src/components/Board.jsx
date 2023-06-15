import React from 'react';
import './Board.css';
import Square from './Square';

const Board = ({ squares, gridSize, handleClick }) => {
    return (
        <div className='board' style={{ width: gridSize * 100 }}>
            {squares.map((square, i) => (
                <Square key={i} value={square} onClick={() => handleClick(i)} />
            ))}
        </div>
    );
};

export default Board;
