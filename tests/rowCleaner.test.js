const { rowCleaner } = require('../utils/methods')

test('Removes rows begins with # or Empty', () => {
    expect(rowCleaner(['#Hello', '' ])).toEqual([])
})