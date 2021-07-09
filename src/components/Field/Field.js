import React, { useState, useEffect, useRef } from 'react';
import './Field.css';


const defaultTileProps = {
    className: 'light',
    isFood: false,
}

const amountOfRows = 10;
const amountOfColumns = amountOfRows;
const food = String.fromCodePoint(0x1F34E); // Apple
const allowedDirections = new Set(['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']);


function Field() {

    const [snakeHeadPosition, setSnakeHeadPosition] = useState({x: 0, y: 0});
    const [foodPosition, setFoodPosition] = useState({x: 5, y: 5});
    const direction = useRef('ArrowRight');

    useEffect(() => {
        const interval = setInterval(() => {
            setSnakeHeadPosition(h => {

                const newHead = {...h};

                switch (direction.current) {
                    case 'ArrowDown':
                        newHead.x++;
                        break
                    case 'ArrowUp':
                        newHead.x--;
                        break
                    case 'ArrowRight':
                        newHead.y++;
                        break
                    case 'ArrowLeft':
                        newHead.y--;
                        break
                    default:
                        break
                }

                // Enable the snake head to go trough walls.
                newHead.x = (newHead.x < amountOfRows) ? newHead.x : 0;
                newHead.y = (newHead.y < amountOfColumns) ? newHead.y : 0;

                return newHead;
            })
        }, 1000);
        
        return () => clearInterval(interval);  // Make sure to clear the interval if the component unmounts.
      }, []);

    const tiles = Array.from(Array(amountOfRows), () => Array.from(Array(amountOfColumns), () => {return {...defaultTileProps}}))

    const handleKeyPress = (e) => {
        if (allowedDirections.has(e.key)) {
            direction.current = e.key;  // useState does not work in the setInterval.
        }
    };

    tiles[snakeHeadPosition.x][snakeHeadPosition.y].className = 'dark';
    tiles[foodPosition.x][foodPosition.y].isFood = true;

    // The tabindex indicates that the element can be focussed. -1 forces the user to click the table first.
    // TODO don't scroll the page when pressing ArrowUp or ArrowDown.
    return (
        <table className='field' onKeyDown={handleKeyPress} tabIndex="-1">
            <tbody>
                {tiles.map((row, rowIndex) => <tr key={rowIndex}>{row.map((tile, columnIndex) => <td key={columnIndex} className={tile.className}>{tile.isFood ? food : ''}</td>)}</tr>)}
            </tbody>
        </table>
    )
}

export default Field;
