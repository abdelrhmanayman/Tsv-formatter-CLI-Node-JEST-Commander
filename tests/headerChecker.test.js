const { headerChecker } = require('../utils/methods')

test('checks header row tabs if there is any unexpected value', () => {
    expect(headerChecker([
        'Project',
        'Description',
        'Start date',
        'Category',
        'Responsible',
        'Savings amount',
        'Currency',
        'Complexity'])).toEqual({
            Project: 0,
            Description: 1,
            'Start date': 2,
            Category: 3,
            Responsible: 4,
            'Savings amount': 5,
            Currency: 6,
            Complexity: 7
        })
})