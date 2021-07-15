const { calculatePositionForRectangularField, calculateIdForRectangularField } = require('../src/components/Field/positions');

// calculateIdForRectangularField
test('calculateIdForRectangularField: zero position', () => expect(
    calculateIdForRectangularField(10, {x: 0, y: 0})).toEqual(0)
)
test('calculateIdForRectangularField: valid position on first row', () => expect(
    calculateIdForRectangularField(10, {x: 4, y: 0})).toEqual(4)
)
test('calculateIdForRectangularField: valid position on row', () => expect(
    calculateIdForRectangularField(10, {x: 4, y: 2})).toEqual(24)
)
test('calculateIdForRectangularField: valid position on first column', () => expect(
    calculateIdForRectangularField(10, {x: 0, y: 2})).toEqual(20)
)
test('calculateIdForRectangularField: valid position on last column', () => expect(
    calculateIdForRectangularField(10, {x: 9, y: 0})).toEqual(9)
)
test('calculateIdForRectangularField: invalid row argument', () => expect(
    () => calculateIdForRectangularField(-5, {x: 0, y: 0})).toThrow()
)

// calculatePositionForRectangularField
test('calculatePositionForRectangularField: zero position', () => expect(
    calculatePositionForRectangularField(10, 10, 0)).toEqual({x: 0, y: 0})
)
test('calculatePositionForRectangularField: valid id on first row', () => expect(
    calculatePositionForRectangularField(10, 10, 4)).toEqual({x: 4, y: 0})
)
test('calculatePositionForRectangularField: valid id on row', () => expect(
    calculatePositionForRectangularField(10, 10, 24)).toEqual({x: 4, y: 2})
)
test('calculatePositionForRectangularField: valid id last row', () => expect(
    calculatePositionForRectangularField(10, 10, 95)).toEqual({x: 5, y: 9})
)
test('calculatePositionForRectangularField: valid id on first column', () => expect(
    calculatePositionForRectangularField(10, 10, 20)).toEqual({x: 0, y: 2})
)
test('calculatePositionForRectangularField: valid id on last column', () => expect(
    calculatePositionForRectangularField(10, 10, 9)).toEqual({x: 9, y: 0})
)
test('calculateIdForRectangularField: invalid id argument', () => expect(
    () => calculatePositionForRectangularField(10, 10, -1)).toThrow()
)
test('calculateIdForRectangularField: invalid row argument', () => expect(
    () => calculatePositionForRectangularField(-10, 10, 5)).toThrow()
)
test('calculateIdForRectangularField: invalid column argument', () => expect(
    () => calculatePositionForRectangularField(10, -10, 5)).toThrow()
)