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


function Scoreboard () {
    return (
    <div className='score-board'>
        <ScoreDisplay displayName='Score' value={10}/>
        <ScoreDisplay displayName='Highscore' value={100}/>
    </div>
    )
}

export default Scoreboard;
