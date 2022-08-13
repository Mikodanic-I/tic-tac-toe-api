import {Positions} from "./PositionsInterface";

type NumbersRange = 0 | 1 | 2

const checkRow = (positions: Positions, row: NumbersRange): string | null => {

    const firstMove = positions[`pos${row}0`]
    const secondMove = positions[`pos${row}1`]
    const thirdMove = positions[`pos${row}2`]

    // Check if all moves are the same and that they are not empty
    if (firstMove && firstMove === secondMove && firstMove === thirdMove)
        return firstMove

    return null
}

const checkColumn = (positions: Positions, col: NumbersRange): string | null => {

    const firstMove = positions[`pos0${col}`]
    const secondMove = positions[`pos1${col}`]
    const thirdMove = positions[`pos2${col}`]

    // Check if all moves are the same and that they are not empty
    if (firstMove && firstMove === secondMove && firstMove === thirdMove)
        return firstMove

    return null
}
const checkLine = (positions: Positions, rowOrCol: NumbersRange): string | null => {
    const winner = checkRow(positions, rowOrCol) || checkColumn(positions, rowOrCol)
    if (winner) return winner

    return null
}


const checkFirstDiagonal = (positions: Positions): string | null => {

    const firstMove = positions[`pos00`]
    const secondMove = positions[`pos11`]
    const thirdMove = positions[`pos22`]

    // Check if all moves are the same and that they are not empty
    if (firstMove && firstMove === secondMove && firstMove === thirdMove)
        return firstMove

    return null
}

const checkSecondDiagonal = (positions: Positions): string | null => {

    const firstMove = positions[`pos02`]
    const secondMove = positions[`pos11`]
    const thirdMove = positions[`pos20`]

    // Check if all moves are the same and that they are not empty
    if (firstMove && firstMove === secondMove && firstMove === thirdMove)
        return firstMove

    return null
}

const checkDiagonal = (positions: Positions): string | null => {
    const winner = checkFirstDiagonal(positions) || checkSecondDiagonal(positions)
    if (winner) return winner

    return null
}

export function getGamewinner(positions: Positions): string | null {
    const winner =
        checkLine(positions, 0)
        || checkLine(positions, 1)
        || checkLine(positions, 2)
        || checkDiagonal(positions)

    if (winner) return winner

    return null
}
