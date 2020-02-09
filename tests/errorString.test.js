const { errorString } = require('../utils/methods')

test('returns error string', () => {
    expect(errorString("John", "Bad", 5)).toEqual("Invalid John value Bad at 5 row")
})