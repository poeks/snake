import React, { useState } from 'react';
import './SnakeGame.css'
import Field from '../Field/Field';
import Scoreboard from '../ScoreBoard/Scoreboard';


function SnakeGame() {

    const [gameRunning, setGameRunning] = useState(false);
    const [positions, setPositions] = useState({snakeBody:[{x: 0, y: 5}, {x: 1, y: 5}], food: {x: 5, y: 5}})

    return (
        <div className='snake-game'>
            {gameRunning ? <Field positions={positions} setPositions={setPositions}/> : <button className='field' onClick={() => setGameRunning(true)}>Press me to start!</button>}
            <Scoreboard buttonHandler={() => setGameRunning(false)}/>
        </div>
    )
}

export default SnakeGame;
