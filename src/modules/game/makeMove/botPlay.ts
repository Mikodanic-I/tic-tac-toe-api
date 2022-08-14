export function botPlay(positions: number[][]) {
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (!positions[x][y]) {
                positions[x][y] = -1
                return positions
            }
        }
    }

    return positions
}
