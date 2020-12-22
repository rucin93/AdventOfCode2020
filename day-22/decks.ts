export function getFinalDecks(decks) {
    const cache = {}
    while (decks.every(deck => deck.length)) {
        const key = JSON.stringify(decks)

        if (cache[key]) return [[1], []]

        const top = decks.map(deck => deck.shift())

        const winner = getWinner(top, decks)
        cache[key] = [...decks.map(deck => [...deck])]
        decks[winner].push(top[winner], top[+!winner])
    }
    return decks
}

export function getWinner(top: string[], decks) {
    if (decks[0].length >= top[0] && decks[1].length >= top[1]) {
        return getFinalDecks(
            decks.map((deck, i) => deck.slice(0, top[i]))
        ).findIndex(deck => !!deck.length)
    } else {
        return top[1] > top[0] ? 1 : 0
    }
}

export function parseDecks(entries: string[]): number[][] {
    return entries.map(player => player.split('\n').slice(1).map(Number))
}

export function calculateScore(decks: number[][]): number {
    return decks.reduce((score, deck) => {
        return (
            score +
            deck.reduce((score, card, i) => {
                return score + (deck.length - i) * card
            }, 0)
        )
    }, 0)
}
