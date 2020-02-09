const { rowSperator } = require('../utils/methods')

test('Sperates rows by splitting lines by \r\n token', () => {
  expect(rowSperator("Hello\r\nThere")).toEqual([ 'Hello', 'There' ])
})