import React, { useState } from 'react';
import './SnakeGame.css'
import Field from '../Field/Field';
import Scoreboard from '../ScoreBoard/Scoreboard';

const initialSnakeBody = [{x: 1, y: 5}, {x: 0, y: 5}];
const initialFoodPosition = {x: 5, y: 5, icon: '🍎'};
const initialPositions = {snakeBody: initialSnakeBody, food: initialFoodPosition};


const calculateScore = (snakeBody) => {
    return (snakeBody.length - initialSnakeBody.length) * 10;
}


function SnakeGame({highScore, setHighScore}) {

    const [gameRunning, setGameRunning] = useState(false);
    const [positions, setPositions] = useState(initialPositions);

    const score = calculateScore(positions.snakeBody);
    let text = 'Press me to start!'

    if (score) {
        text += `\nYour score is ${score}`
    }

    return (
        <div className='snake-game'>
            {gameRunning
                ?
            <Field positions={positions} setPositions={setPositions} setGameRunning={setGameRunning} setHighScore={setHighScore}/>
                :
            <button className='field' onClick={() => {setGameRunning(true); if (score){setPositions(initialPositions)}}}><pre>{text}</pre></button>}
            <Scoreboard score={score} highScore={highScore} buttonHandler={() => {setGameRunning(false); setPositions(initialPositions)}}/>
        </div>
    )
}

export default SnakeGame;
export { calculateScore };
