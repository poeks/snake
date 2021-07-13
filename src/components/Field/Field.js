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


function generateRandomPosition() {
    // Substract 1 from amountOfRows/Columns because tiles array is zero based indexed.
    const xCoordinate = Math.round(Math.random() * amountOfRows - 1);
    const yCoordinate = Math.round(Math.random() * amountOfColumns - 1);
    return {x: xCoordinate, y: yCoordinate}
}


function positionsAreEqual(firstPosition, secondPosition) {
    return firstPosition?.x === secondPosition?.x && firstPosition?.y === secondPosition?.y;
}


function Field() {

    const [snakeHeadPosition, setSnakeHeadPosition] = useState({x: 0, y: 0});
    const [foodPosition, setFoodPosition] = useState({x: 5, y: 5});
    const direction = useRef('ArrowRight');

    useEffect(() => {
        document.getElementById('playing-field').focus();  // Required so key presses will immediately work.
        
        const interval = setInterval(() => {
            setSnakeHeadPosition(h => {

                const newHead = {...h};

                // Enable the snake head to go trough walls.
                switch (direction.current) {
                    case 'ArrowDown':
                        newHead.y = newHead.y === amountOfRows - 1 ? 0 : newHead.y + 1
                        break
                    case 'ArrowUp':
                        newHead.y = newHead.y === 0 ? amountOfRows - 1 : newHead.y -1
                        break
                    case 'ArrowRight':
                        newHead.x = newHead.x === amountOfColumns - 1 ? 0 : newHead.x + 1
                        break
                    case 'ArrowLeft':
                        newHead.x = newHead.x === 0 ? amountOfColumns - 1 : newHead.x -1
                        break
                    default:
                        break
                }

                return newHead;
            });


        }, 750);
        
        return () => clearInterval(interval);  // Make sure to clear the interval if the component unmounts.
      }, []);

    const tiles = Array.from(Array(amountOfRows), () => Array.from(Array(amountOfColumns), () => {return {...defaultTileProps}}))

    const handleKeyPress = (e) => {
        if (allowedDirections.has(e.key)) {
            direction.current = e.key;  // useState does not work in the setInterval.
            e.preventDefault();  // Prevent that the up and down arrow keys scroll the page.
        }
    };

    tiles[snakeHeadPosition.y][snakeHeadPosition.x].className = 'dark';
    tiles[foodPosition.y][foodPosition.x].isFood = true;  // TOOD crashes sometimes when new food is generated

    if (positionsAreEqual(snakeHeadPosition, foodPosition)) {
        setFoodPosition(generateRandomPosition())
    }

    // The tabindex indicates that the element can be focussed. -1 forces the user to click the table first.
    // TODO don't scroll the page when pressing ArrowUp or ArrowDown.
    return (
        <table id='playing-field' className='field' onKeyDown={handleKeyPress} tabIndex="-1">
            <tbody>
                {tiles.map((row, rowIndex) => <tr key={rowIndex}>{row.map((tile, columnIndex) => <td key={columnIndex} className={tile.className}>{tile.isFood ? food : ''}</td>)}</tr>)}
            </tbody>
        </table>
    )
}

export default Field;
