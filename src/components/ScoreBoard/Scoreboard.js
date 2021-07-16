import React from 'react';
import './Scoreboard.css';


function ScoreDisplay ({displayName, value}) {
    return (
        <div className='score-display'>
            <div>{ displayName } </div>
            <div>{ value }</div>
        </div>
    )
}


function Scoreboard ({score, buttonHandler}) {
    return (
    <div className='score-board'>
        <ScoreDisplay displayName='Score' value={score}/>
        <ScoreDisplay displayName='Highscore' value={0}/>
        <button onClick={buttonHandler}>Reset game</button>
    </div>
    )
}

export default Scoreboard;
