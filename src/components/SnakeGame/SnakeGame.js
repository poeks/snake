import React, { useState } from 'react';
import './SnakeGame.css'
import Field from '../Field/Field';
import Scoreboard from '../ScoreBoard/Scoreboard';

const initialSnakeBody = [{x: 0, y: 5}, {x: 1, y: 5}];
const initialFoodPosition = {x: 5, y: 5};


const calculateScore = (snakeBody) => {
    return (snakeBody.length - initialSnakeBody.length) * 10;
}

function SnakeGame() {

    const [gameRunning, setGameRunning] = useState(false);
    const [positions, setPositions] = useState({snakeBody: initialSnakeBody, food: initialFoodPosition})

    return (
        <div className='snake-game'>
            {gameRunning ? <Field positions={positions} setPositions={setPositions}/> : <button className='field' onClick={() => setGameRunning(true)}>Press me to start!</button>}
            <Scoreboard score={calculateScore(positions.snakeBody)}buttonHandler={() => setGameRunning(false)}/>
        </div>
    )
}

export default SnakeGame;
