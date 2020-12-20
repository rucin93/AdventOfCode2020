const fs = require('fs')
const axios = require('axios')
const createTable = require('markdown-table')
const consola = require('consola')

const updateTable = dayNr =>
    axios(`https://adventofcode.com/2020/day/${dayNr}`).then(res => {
        const title = res.data.match(/--- Day \d*: (.*) ---/)[1]

        return {
            day: dayNr,
            title,
            link: `[${dayNr}]: https://adventofcode.com/2020/day/${dayNr}`
        }
    })

const prepareTable = (data, dayNr) =>
    createTable(
        [
            ['Day', 'Quest', 'Part 1', 'Part 2'],
            ...data.map((title, index) => [
                index + 1,
                `[${title}][${index + 1}]`,
                ':star:',
                ':star:'
            ]),
            [dayNr + 1, 'Coming soon...']
        ],
        { align: ['c', 'c', 'c', 'c'] }
    )

fs.writeFileSync('./puzzle-names.txt', '')
fs.writeFileSync('./README.md', '')

axios(`https://adventofcode.com/2020`)
    .then(res => {
        const data = res.data
            .match(/\/2020\/day\/(\d*)/g)
            .map(el => parseInt(el.replace(/\/2020\/day\//g, '')))
        Promise.all(data.map(day => updateTable(day))).then(elements => {
            const titleMap = elements.sort((a,b)=>a.day-b.day).map(item => item.title)
            const links = elements.sort((a,b)=>a.day-b.day).map(item => item.link)

            titleMap.forEach(title => {
                fs.appendFileSync('./puzzle-names.txt', `${title}\n`)
            })

            fs.writeFileSync(
                './README.md',
                `# Advent of Code
Solutions for [Advent of Code 2020](https://adventofcode.com/2020/) in TypeScript

## Stars
${prepareTable(titleMap, titleMap.length)}


## How to run?
Install dependencies:
\`\`\`shell
npm ci
\`\`\`

Run solution by day and part number:
\`\`\`shell
npm run start <day-nr> <part-nr>
\`\`\`

${links.join('\n')}
`
            )
        })
    })
    .then(() => {
        consola.success('README.md generated succesfully')
    })
    .catch(error => {
        consola.error(error)
    })
