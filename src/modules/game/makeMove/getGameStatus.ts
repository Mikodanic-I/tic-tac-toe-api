type NumbersRange = 0 | 1 | 2
type Positions = number[][]

const checkRow = (positions: Positions, row: NumbersRange): number | null => {

    const firstMove = positions[row][0]
    const secondMove = positions[row][1]
    const thirdMove = positions[row][2]

    // Check if all moves are the same and that they are not empty
    if (firstMove && firstMove === secondMove && firstMove === thirdMove)
        return firstMove

    return null
}

const checkColumn = (positions: Positions, col: NumbersRange): number | null => {

    const firstMove = positions[0][col]
    const secondMove = positions[1][col]
    const thirdMove = positions[2][col]

    // Check if all moves are the same and that they are not empty
    if (firstMove && firstMove === secondMove && firstMove === thirdMove)
        return firstMove

    return null
}
const checkLine = (positions: Positions, rowOrCol: NumbersRange): number | null => {
    const winner = checkRow(positions, rowOrCol) || checkColumn(positions, rowOrCol)
    if (winner) return winner

    return null
}


const checkFirstDiagonal = (positions: Positions): number | null => {

    const firstMove = positions[0][0]
    const secondMove = positions[1][1]
    const thirdMove = positions[2][2]

    // Check if all moves are the same and that they are not empty
    if (firstMove && firstMove === secondMove && firstMove === thirdMove)
        return firstMove

    return null
}

const checkSecondDiagonal = (positions: Positions): number | null => {

    const firstMove = positions[0][2]
    const secondMove = positions[1][1]
    const thirdMove = positions[2][0]

    // Check if all moves are the same and that they are not empty
    if (firstMove && firstMove === secondMove && firstMove === thirdMove)
        return firstMove

    return null
}

const checkDiagonal = (positions: Positions): number | null => {
    const winner = checkFirstDiagonal(positions) || checkSecondDiagonal(positions)
    if (winner) return winner

    return null
}

const isLeftMoves = (positions: Positions) => {
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (!positions[x][y]) return true
        }
    }

    return false
}

export function getGameStatus(positions: Positions): string {
    const winner =
        checkLine(positions, 0)
        || checkLine(positions, 1)
        || checkLine(positions, 2)
        || checkDiagonal(positions)

    if (winner) return "win"

    if (isLeftMoves(positions)) return "makeMove"

    return "draw"
}
