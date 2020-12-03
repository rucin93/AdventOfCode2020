import {checkGrid} from "./part-1";

console.log([[1,1], [1,3], [1, 5], [1,7], [2,1]].map(set => {
    const [x, y] = set
    return checkGrid(x,y)
}).reduce((n,p)=> n * p, 1))