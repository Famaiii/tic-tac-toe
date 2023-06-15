// import React, { useState, useEffect } from 'react';
// import './Game.css';
// import Board from './Board';
// import { calculateWinner } from '../winLogic';

// const Game = () => {
//     const [board, setBoard] = useState(Array(9).fill(null));
//     const [xIsNext, setXIsNext] = useState(true);
//     const [player1Wins, setPlayer1Wins] = useState(0);
//     const [player2Wins, setPlayer2Wins] = useState(0);
//     const [totalGames, setTotalGames] = useState(0);
//     const [showModal, setShowModal] = useState(false);
//     const [modalMessage, setModalMessage] = useState('');
//     const winner = calculateWinner(board);

//     useEffect(() => {
//         if (winner) {
//             handleGameEnd(winner);
//         }
//     }, [winner]);

//     const handleGameEnd = (winner) => {
//         console.log('вывывыфв')
//         let message = '';
//         if (winner === 'X') {
//             setPlayer1Wins(player1Wins + 1);
//             message = 'Гравець 1 переміг. Вітаємо!';
//         } else if (winner === 'O') {
//             setPlayer2Wins(player2Wins + 1);
//             message = 'Гравець 2 переміг. Вітаємо!';
//         } else {
//             message = 'Нічия! Спробуйте ще :)';
//         }
//         setTotalGames(totalGames + 1);
//         setTimeout(() => {
//             setShowModal(true);
//         }, 2000);
//         setModalMessage(message);
//     };

//     const handleClick = (index) => {
//         const boardCopy = [...board];
//         if (winner || boardCopy[index]) return;
//         boardCopy[index] = xIsNext ? 'X' : 'O';
//         setBoard(boardCopy);
//         setXIsNext(!xIsNext);
//     };

//     const handleNewGame = () => {
//         setBoard(Array(9).fill(null));
//         setXIsNext(true);
//     };

//     const handleModalClose = () => {
//         setShowModal(false);
//     };

//     return (
//         <div className='wrapper'>
//             <div className='player-info'>
//                 <div className='player-info__item'>
//                     ГРАВЕЦЬ 1: символ - X; <br /> Кількість виграшів -{' '}
//                     {player1Wins}
//                 </div>
//                 <br />
//                 <div className='player-info__item'>
//                     ГРАВЕЦЬ 2: символ - O; <br /> Кількість виграшів -{' '}
//                     {player2Wins}
//                 </div>
//             </div>
//             <button className='start__btn' onClick={handleNewGame}>
//                 Нова гра
//             </button>
//             <div className='game-info'>
//                 Зіграно ігор: {totalGames} | Зараз ходить: ГРАВЕЦЬ{' '}
//                 {xIsNext ? '1' : '2'}
//             </div>
//             <Board squares={board} handleClick={handleClick} />
//             {showModal && (
//                 <div className='modal' onClick={handleModalClose}>
//                     <div className='modal-content'>
//                         <p>{modalMessage}</p>
//                         <button
//                             className='modal-close'
//                             onClick={handleModalClose}
//                         >
//                             Ок
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Game;

import React, { useState, useEffect } from 'react';
import './Game.css';
import Board from './Board';
import { calculateWinner } from '../winLogic';

const Game = () => {
    const [gridSize, setGridSize] = useState(3); // Додано новий стан gridSize
    const [board, setBoard] = useState(Array(gridSize * gridSize).fill(null)); // Оновлено початковий стан board
    const [xIsNext, setXIsNext] = useState(true);
    const [player1Wins, setPlayer1Wins] = useState(0);
    const [player2Wins, setPlayer2Wins] = useState(0);
    const [totalGames, setTotalGames] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const winner = calculateWinner(board);

    useEffect(() => {
        if (winner) {
            handleGameEnd(winner);
        }
    }, [winner]);

    const handleGameEnd = (winner) => {
        let message = '';
        if (winner === 'X') {
            setPlayer1Wins(player1Wins + 1);
            message = 'Гравець 1 переміг. Вітаємо!';
        } else if (winner === 'O') {
            setPlayer2Wins(player2Wins + 1);
            message = 'Гравець 2 переміг. Вітаємо!';
        } else {
            message = 'Нічия! Спробуйте ще :)';
        }
        setTotalGames(totalGames + 1);
        setTimeout(() => {
            setShowModal(true);
        }, 2000);
        setModalMessage(message);
    };

    const handleClick = (index) => {
        const boardCopy = [...board];
        if (winner || boardCopy[index]) return;
        boardCopy[index] = xIsNext ? 'X' : 'O';
        setBoard(boardCopy);
        setXIsNext(!xIsNext);
    };

    const handleNewGame = () => {
        setBoard(Array(gridSize * gridSize).fill(null));
        setXIsNext(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleGridSizeChange = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setGridSize(newSize);
        setBoard(Array(newSize * newSize).fill(null));
        setXIsNext(true);
        setPlayer1Wins(0);
        setPlayer2Wins(0);
        setTotalGames(0);
        setShowModal(false);
        setModalMessage('');
    };

    return (
        <div className='wrapper'>
            <div className='player-info'>
                <div className='player-info__item'>
                    ГРАВЕЦЬ 1: символ - X; <br /> Кількість виграшів -{' '}
                    {player1Wins}
                </div>
                <br />
                <div className='player-info__item'>
                    ГРАВЕЦЬ 2: символ - O; <br /> Кількість виграшів -{' '}
                    {player2Wins}
                </div>
            </div>
            <div>
                Виберіть розмірність сітки:
                <select
                    className='grid'
                    value={gridSize}
                    onChange={handleGridSizeChange}
                >
                    <option value={3}>3x3</option>
                    <option value={4}>4x4</option>
                    <option value={5}>5x5</option>
                    <option value={6}>6x6</option>
                    <option value={7}>7x7</option>
                    <option value={8}>8x8</option>
                    <option value={9}>9x9</option>
                </select>
            </div>
            <button className='start__btn' onClick={handleNewGame}>
                Нова гра
            </button>
            <div className='game-info'>
                Зіграно ігор: {totalGames} | Зараз ходить: ГРАВЕЦЬ{' '}
                {xIsNext ? '1' : '2'}
            </div>
            <Board
                squares={board}
                gridSize={gridSize}
                handleClick={handleClick}
            />
            {showModal && (
                <div className='modal' onClick={handleModalClose}>
                    <div className='modal-content'>
                        <p>{modalMessage}</p>
                        <button
                            className='modal-close'
                            onClick={handleModalClose}
                        >
                            Ок
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;
