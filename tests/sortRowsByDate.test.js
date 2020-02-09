const { sortRowsByDate } = require('../utils/methods')

test('Sort Rows by starting dates in ascending orders and skipping header column Using bubble sort algorithm', () => {
    expect(sortRowsByDate([['Project',
        'Description',
        'Start date',
        'Category',
        'Responsible',
        'Savings amount',
        'Currency',
        'Complexity'],
    ['6',
        'Black and white logo paper',
        '2012-06-01 00:00:00.005',
        'Office supplies',
        'Clark Kent',
        '4880.199567',
        'EUR',
        'Simple'],
    ['6',
        'Black and white logo paper',
        '2012-06-01 00:00:00.000',
        'Office supplies',
        'Clark Kent',
        '4880.199567',
        'EUR',
        'Simple']],
        {
            Project: 0,
            Description: 1,
            'Start date': 2,
            Category: 3,
            Responsible: 4,
            'Savings amount': 5,
            Currency: 6,
            Complexity: 7
        }))
        .toBeUndefined()
})