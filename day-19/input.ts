import { getLinesFromFile } from '../utils'

const [rulesData, messagesData] = getLinesFromFile(
    `${__dirname}/input.txt`,
    '\n\n'
)

const rulesObj = rulesData.split('\n').map(line => ({
    id: line.split(': ')[0],
    match: line
        .split(': ')[1]
        .split(' | ')
        .map(r =>
            r
                .split(' ')
                .map(x =>
                    isNaN(parseInt(x)) ? x.replace(/\"/g, '') : Number(x)
                )
        )
}))
const rulesArray = []
Object.entries(rulesObj).forEach(([i, r]) => (rulesArray[r.id] = r.match))

export const rules = rulesArray
export const messages = messagesData.split('\n')
