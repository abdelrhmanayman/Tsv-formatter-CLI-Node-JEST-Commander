const fs = require('fs')
const { skippingChars, complexityValues, headerValues, moneyPattern } = require('./constants')

/* 
* params: rows:[Strings]
* return: [Strings]
* Sperates content into rows by splitting by \r\n 
*/
const rowSperator = content => content ? content.split('\r\n') : []

/*
 * params: rows:[Strings]
 * return: [Strings]
 * Remove any row begins with # or empty space 
 */
const rowCleaner = rows => rows ? rows.filter(row => row !== '' && !skippingChars.includes(row.trim()[0])) : []

/*
* params: rows:[Strings]
* return: [Strings]
* Takes an array of cleaned rows and sperate them to columns tabs and pushed to an array 
*/
const columnSperator = rows => rows ? rows.map(row => row.split('\t')) : []

/*
* params: rows => [rows:[array]]
* prints the result of the process in format of tab seperated format
*/
const PrintResult = rows => {
    let output = ""
    rows.map(row => {
        let rowText = ""
        row.map(tab => rowText += `${tab}\t`)
        output += `${rowText}\r\n`
    })
    console.log(output)
}

/* 
* params: (rows:[rows:[array]], headerIndex: object of header columns index)
* return: rows:[rows:[array]]
* Sorting rows by Starting Date Column Using BUBBLE SORT algorithm
*/
const sortRowsByDate = (rows, headerIndex) => {
    for (let i = 1; i < rows.length - 1; i++) {
        for (let j = 1; j < rows.length - i; j++) {
            if (Date.parse(rows[j][headerIndex['Start date']]) > Date.parse(rows[j + 1][headerIndex['Start date']])) {
                let temp = rows[j]
                rows[j] = rows[j + 1]
                rows[j + 1] = temp
            }
        }
    }
}

/*
* params: (rows:[rows:[array]], filter: String, headerIndex: object of header columns index)
* return: rows:[rows:[array]]
* Filters array of rows by ProjectID and if nothing found a message is logged and process is terminated
 */
const filterByProject = (rows, filter, headerIndex) => {
    let filteredRows = rows.filter((row, index) => index === 0 ? row : row[headerIndex['Project']] === filter)
    if (filteredRows.length === 1)
        errorAndTerminate(`No rows matches ${filter}`)
    return filteredRows
}

/*
* params: (columnName: String, value: String, rowNumber: Number)
* Checks if (savings amount, date, complexity) values are valid in all rows and if one is not error message is logged and process is terminated
 */
const errorString = (columnName, value, rowNumber) => `Invalid ${columnName} value ${value} at ${rowNumber} row`

/*
* params: (rows:[rows:[array]], headerIndex: object of header columns index)
* Checks if (savings amount, date, complexity) values are valid in all rows and if one is not error message is logged and process is terminated
 */
const dataChecker = (rows, headerIndex) => {
    for (let i = 1; i < rows.length; i++) {
        removeNulls(rows, i, headerIndex)
        if (!moneyPattern.test(rows[i][headerIndex['Savings amount']]) && rows[i][headerIndex['Savings amount']] !== '  ')
            errorAndTerminate(errorString("Saving Amount", rows[i][headerIndex['Savings amount']], i + 1))
        if (!complexityValues.includes(rows[i][headerIndex['Complexity']]))
            errorAndTerminate(errorString("Complexity", rows[i][headerIndex['Complexity']], i + 1))
        if (isNaN(Date.parse(rows[i][headerIndex['Start date']])))
            errorAndTerminate(errorString("Start date", rows[i][headerIndex['Start date']], i + 1))
    }
}

/*
* params: (rows:[rows:[array]], index: Number, headerIndex: object of header columns index)
* Removing NULL values from saving amount and Currency columns and replace it with empty string
 */
const removeNulls = (rows, index, headerIndex) => {
    if (rows[index][headerIndex['Savings amount']] === 'NULL')
        rows[index][headerIndex['Savings amount']] = '  '
    if (rows[index][headerIndex['Currency']] === 'NULL')
        rows[index][headerIndex['Currency']] = '    '
}

/*
* params: error: String
consoles an error and terminates the process
*/
const errorAndTerminate = (error = "") => {
    console.error(error)
    process.exit(1)
}

/*
* params: header:[String]
* return: Object
* Checks the tabs values of the header(first element) if it's all allowed if true, objects contains index of each column in the header is returned otherwise proccess is terminated
*/
const headerChecker = header => {
    let headerIndex = {}
    for (let i = 0; i < header.length; i++) {
        if (!headerValues.includes(header[i].trim()))
            errorAndTerminate(`${header[i]} is not allowed at headers`)
        else
            headerIndex[header[i]] = i
    }
    return headerIndex
}

/*
* params: (file: String, project: String, sortByDate: Boolean)
* The main function that be called at index.js
*/
const operation = ({ file, project, sortByDate }) => {
    try {
        let fileContent = fs.readFileSync(file, "utf8")
        let rows = rowSperator(fileContent)
        rows = rowCleaner(rows)
        rows = columnSperator(rows)
        let headerIndex = headerChecker(rows[0])
        dataChecker(rows, headerIndex)
        if (project) rows = filterByProject(rows, project, headerIndex)
        if (sortByDate) sortRowsByDate(rows, headerIndex)
        PrintResult(rows)
    }
    catch (err) {
        if (err.code === "ENOENT") errorAndTerminate("no such file!")//if file is not found
        else
            errorAndTerminate(err.message)
    }
}

module.exports = {
    sortRowsByDate,
    operation,
    headerChecker,
    errorAndTerminate,
    dataChecker,
    filterByProject,
    PrintResult,
    columnSperator,
    rowCleaner,
    rowSperator,
    removeNulls,
    errorString
}
