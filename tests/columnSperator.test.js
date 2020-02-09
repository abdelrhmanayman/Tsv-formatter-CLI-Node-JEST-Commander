const { columnSperator } = require('../utils/methods')

test('devide row into columns by splitting on \t token', () => {
    expect(columnSperator(['Hello\tThere', 'I\tLove\tyou'])).toEqual([['Hello', 'There'], ['I', 'Love', 'you']])
})