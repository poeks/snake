import React, { useState, useEffect } from 'react';
import './Field.css';


const defaultTileProps = {
    className: 'light',
    isFood: false,
}

const amountOfRows = 10;
const amountOfColumns = amountOfRows - 2;
const food = String.fromCodePoint(0x1F34E); // Apple


function Field() {

    const [snakeHeadPosition, setSnakeHeadPosition] = useState({x: 0, y: 0});
    const [foodPosition, setFoodPosition] = useState({x: 5, y: 5});

    useEffect(() => {
        const interval = setInterval(() => {

            setSnakeHeadPosition(h => {
                const newHead = {...h, x: h.x++};
                newHead.x = (newHead.x < amountOfRows) ? newHead.x : 0
                return newHead;
            })
        }, 1000);
        
        return () => clearInterval(interval);  // Make sure to clear the interval if the component unmounts.
      }, []);

    const tiles = Array.from(Array(amountOfRows), () => Array.from(Array(amountOfColumns), () => {return {...defaultTileProps}}))

    tiles[snakeHeadPosition.x][snakeHeadPosition.y].className = 'dark';
    tiles[foodPosition.x][foodPosition.y].isFood = true;

    return (
        <table className='field'>
            <tbody>
                {tiles.map(row => <tr>{row.map(column => <td className={column.className}>{column.isFood ? food : ''}</td>)}</tr>)}
            </tbody>
        </table>
    )
}

export default Field;
