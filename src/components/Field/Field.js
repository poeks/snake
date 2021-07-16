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
const foodEmojis = new Set(['🍎', '🍉', '🥥', '🍄', '🥜', '🥦', '🧀', '🌮', '🍙', '🍪', '🍺']);
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


function Field({positions, setPositions, setGameRunning}) {

    // Define all positions in a single state makes setting in the useEffect callback easier.
    const directionRef = useRef('ArrowRight');

    useEffect(() => {
        document.getElementById('playing-field').focus();  // Make key presses immediately work when starting game and between intervals.
        
        const interval = setInterval(() => {
            setPositions(positions => {

                const newPositions = deepCopy(positions);
                const currentHead = newPositions.snakeBody[0];
                const nextHead = {...currentHead};

                // Enable the snake head to go trough walls.
                switch (directionRef.current) {
                    case 'ArrowDown':
                        nextHead.y = nextHead.y === amountOfRows - 1 ? 0 : nextHead.y + 1
                        break
                    case 'ArrowUp':
                        nextHead.y = nextHead.y === 0 ? amountOfRows - 1 : nextHead.y -1
                        break
                    case 'ArrowRight':
                        nextHead.x = nextHead.x === amountOfColumns - 1 ? 0 : nextHead.x + 1
                        break
                    case 'ArrowLeft':
                        nextHead.x = nextHead.x === 0 ? amountOfColumns - 1 : nextHead.x -1
                        break
                    default:
                        break
                }

                newPositions.snakeBody = [nextHead, ...newPositions.snakeBody]
                const bodyIDPositions = new Set(positions.snakeBody.map(p => calculateIDFromPosition(p)));

                if (bodyIDPositions.has(calculateIDFromPosition(nextHead))) {
                    setGameRunning(false);
                }

                if (positionsAreEqual(nextHead, newPositions.food)) {
                    // New food positions has to be randomly selected from a position not occupied by the snake body.
                    const tileIDs = new Set(Array(amountOfRows * amountOfColumns).keys());

                    newPositions.snakeBody.forEach((p) => {
                        tileIDs.delete(calculateIDFromPosition(p));
                    })
                    newPositions.food = calculatePositionFromID(getRandomItemFromSet(tileIDs));
                    newPositions.food.icon = getRandomItemFromSet(foodEmojis)

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

    snakeBody.forEach((position) => {tiles[position.y][position.x].className = 'dark'})
    tiles[food.y][food.x].isFood = true;

    // The tabindex indicates that the element can be focussed. -1 forces the user to click the table first.
    return (
        <table id='playing-field' className='field' onKeyDown={handleKeyPress} tabIndex="-1">
            <tbody>
                {tiles.map((row, rowIndex) => <tr key={rowIndex}>{row.map((tile, columnIndex) => <td key={columnIndex} className={tile.className}>{tile.isFood ? food.icon : ''}</td>)}</tr>)}
            </tbody>
        </table>
    )
}

export default Field;
