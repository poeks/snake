import React from 'react';
import './SnakeGame.css'
import Field from '../Field/Field';
import Scoreboard from '../ScoreBoard/Scoreboard';


function SnakeGame() {
    return (
        <div className='snake-game'>
            <Field/>
            <Scoreboard/>
        </div>
    )
}

export default SnakeGame;
