import React, { useState, useEffect } from 'react';
import './SnakeGame.css'
import Field from '../Field/Field';
import Scoreboard from '../ScoreBoard/Scoreboard';


function SnakeGame() {

    const [gameRunning, setGameRunning] = useState(false);

    const handleClick = () => {
        setGameRunning(true);
    }

    return (
        <div className='snake-game'>
            {gameRunning ? <> <Field/> <Scoreboard/> </> : <button onClick={handleClick}>Press me to start!</button>}
        </div>
    )
}

export default SnakeGame;
