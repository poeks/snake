/*

A position has x (column axis) and y (row acis) coordinates: both are zero-based indexed.
The ID is zero based indexed, starts counting from top left to right, downwards.

Example of a 3 rows and 5 columns field:

    → x
↓   0  1  2  3  4
y   5  6  7  8  9
    10 11 12 13 14

*/


const calculatePositionForRectangularField = (amountOfRows, amountOfColumns, id) => {
    if (amountOfRows < 1) {
        throw new Error(`amountOfRows must be greater than 1, received '${amountOfRows}'`)
    }
    if (amountOfColumns < 1) {
        throw new Error(`amountOfColumns must be greater than 1, received '${amountOfColumns}'`)
    }
    if (id < 0) {
        throw new Error(`id must be greater than 0, received '${id}'`)
    }
    const x = id % amountOfColumns;
    const y = Math.floor(id / amountOfRows);
    return {x, y};
}


const calculateIdForRectangularField = (amountOfRows, position) => {
    if (amountOfRows < 1) {
        throw new Error(`amountOfRows must be greater than 1, received '${amountOfRows}'`)
    }
    return position.y * amountOfRows + position.x;
}

const positionsAreEqual = (firstPosition, secondPosition) => {
    return firstPosition?.x === secondPosition?.x && firstPosition?.y === secondPosition?.y;
}


module.exports = {
    positionsAreEqual,
    calculatePositionForRectangularField,
    calculateIdForRectangularField
};
