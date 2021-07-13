import React, { useState } from 'react';
import './SnakeGame.css'
import Field from '../Field/Field';
import Scoreboard from '../ScoreBoard/Scoreboard';


function SnakeGame() {

    const [gameRunning, setGameRunning] = useState(false);

    return (
        <div className='snake-game'>
            {gameRunning ? <Field/> : <button className='field' onClick={() => setGameRunning(true)}>Press me to start!</button>}
            <Scoreboard buttonHandler={() => setGameRunning(false)}/>
        </div>
    )
}

export default SnakeGame;
