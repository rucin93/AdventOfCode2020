import { getLinesFromFile, multiply } from '../utils'
import { getEdgesId, parseConnections, parseEdges, parseTiles } from './parse'
const entries = getLinesFromFile(`${__dirname}/input.txt`, '\n\n')

const tiles = parseTiles(entries)
const edges = parseEdges(tiles)
const edgeToId = getEdgesId(edges)
const connections = parseConnections(edges, edgeToId)

const cornerIds = Object.keys(connections).filter(
    id => !id.endsWith('f') && connections[id].filter(Boolean).length === 2
)

console.log(cornerIds.reduce(multiply, 1))
