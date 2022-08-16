import {Player} from "../entity/Player";

const Players: Player[] = []

const Add = (player: Player): Player => {
    const id = Players.length + 1
    const newPlayer = {...player, id}

    Players.push(newPlayer)
    return newPlayer
}

const GetAll = (): Player[] => {
    return [...Players]
}

const Get = (id: number): Player | null => {
    return Players.find(player => player.id === id) || null
}

const Save = (id: number, player: Player): Player | null => {
    const playerIndex = Players.findIndex(player => player.id === id)

    if (playerIndex < 0) return null

    Players[playerIndex] = player

    return Players[playerIndex]
}

const Delete = (id: number): Player | null => {
    const playerIndex = Players.findIndex(player => player.id === id)

    if (playerIndex < 0) return null

    const deletedPlayer = Players.splice(playerIndex, 1)
    return deletedPlayer[0]
}

export const PlayerRepository = {Add, GetAll, Get, Save, Delete}
