import React, { useEffect, useRef } from 'react';
import './Field.css';
import {
    positionsAreEqual,
    calculatePositionForRectangularField,
    calculateIdForRectangularField
} from '../Field/positions';


const defaultTileProps = {
    className: 'light',
    isFood: false,
}

const amountOfRows = 10;
const amountOfColumns = amountOfRows;
const foodEmoji = String.fromCodePoint(0x1F34E); // Apple
const allowedDirections = new Set(['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']);

const generateTiles = () =>  Array.from(Array(amountOfRows), () => Array.from(Array(amountOfColumns), () => {return {...defaultTileProps}}));
const calculatePositionFromID = calculatePositionForRectangularField.bind(null, amountOfRows, amountOfColumns);
const calculateIDFromPosition = calculateIdForRectangularField.bind(null, amountOfRows);


const getReserveDirection = (direction) =>  {
    switch (direction) {
        case 'ArrowRight':
            return 'ArrowLeft';
        case 'ArrowLeft':
            return 'ArrowRight';
        case 'ArrowUp':
            return 'ArrowDown';
        case 'ArrowDown':
            return 'ArrowUp';
        default:
            return undefined;
    }
}


const isValidChangeOfDirection = (event, direction) => {
    return allowedDirections.has(event.key) && event.key !== getReserveDirection(direction)
}


const getRandomItemFromSet = set => {
    return Array.from(set)[Math.floor(Math.random() * set.size)];
}


const deepCopy = (object) => {
    // Note: method does not gaurantee deepcopy.
    return JSON.parse(JSON.stringify(object))
}


function Field({positions, setPositions}) {

    // Define all positions in a single state makes setting in the useEffect callback easier.
    const directionRef = useRef('ArrowRight');

    useEffect(() => {
        document.getElementById('playing-field').focus();  // Make key presses immediately work when starting game and between intervals.
        
        const interval = setInterval(() => {
            setPositions(p => {

                const newPositions = deepCopy(p);
                const newHead = {x: newPositions.snakeBody[0].x, y: newPositions.snakeBody[0].y};

                // Enable the snake head to go trough walls.
                switch (directionRef.current) {
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

                newPositions.snakeBody = [newHead, ...newPositions.snakeBody]

                if (positionsAreEqual(newHead, newPositions.food)) {
                    // New food positions has to be randomly selected from a position not occupied by the snake body.
                    const tileIDs = new Set(Array(amountOfRows * amountOfColumns).keys());

                    newPositions.snakeBody.forEach((p) => {
                        tileIDs.delete(calculateIDFromPosition(p));
                    })
                    newPositions.food = calculatePositionFromID(getRandomItemFromSet(tileIDs));

                } else {
                    newPositions.snakeBody.pop();  // Remove last item so snake moves forward.
                }

                return newPositions;
            });

        }, 750);
        
        return () => clearInterval(interval);  // Make sure to clear the interval if the component unmounts.
      }, []);

    const tiles = generateTiles();

    const handleKeyPress = (e) => {
        e.preventDefault();  // Prevent that the up and down arrow keys scroll the page.
        if (isValidChangeOfDirection(e, directionRef.current)) {
            directionRef.current = e.key;  // useState does not work in the setInterval.
        }
    };

    const { snakeBody, food } = positions;

    snakeBody.forEach((position, i) => {tiles[position.y][position.x].className = 'dark'})
    tiles[food.y][food.x].isFood = true;

    // The tabindex indicates that the element can be focussed. -1 forces the user to click the table first.
    return (
        <table id='playing-field' className='field' onKeyDown={handleKeyPress} tabIndex="-1">
            <tbody>
                {tiles.map((row, rowIndex) => <tr key={rowIndex}>{row.map((tile, columnIndex) => <td key={columnIndex} className={tile.className}>{tile.isFood ? foodEmoji : ''}</td>)}</tr>)}
            </tbody>
        </table>
    )
}

export default Field;
