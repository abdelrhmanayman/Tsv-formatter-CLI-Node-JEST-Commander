const program = require('commander')
const { operation } = require('./utils/methods')

program
    .command('glory <File>')//defining <File> argument
    .option('-s, --sortByDate', 'sort columns by date is ascending order')//Defining sortByDate option with the description to be viewed at --help
    .option('--project <project>', 'search by project number')//Defining --project option to filter the file with projectID
    .action(function (file, options) {
        const { project, sortByDate } = options
        operation({ file, project, sortByDate })
    })

program.parse(process.argv)//parsing the process argv


