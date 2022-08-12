import {Game} from "../entity/Game";

const Games: Game[] = []

const Add = (game: Game): Game => {
    Games.push(game)

    return game
}

const GetAll = (): Game[] => {
    return [...Games]
}

const Get = (id: string): Game | null => {
    return Games.find(game => game.id === id) || null
}

const Save = (id: string, game: Game): Game | null => {
    const gameIndex = Games.findIndex(player => player.id === id)

    if (gameIndex < 0) return null

    Games[gameIndex] = game

    return Games[gameIndex]
}

const Delete = (id: string): Game | null => {
    const gameIndex = Games.findIndex(game => game.id === id)

    if (gameIndex < 0) return null

    const deletedPlayer = Games.splice(gameIndex, 1)
    return deletedPlayer[0]
}

export const GameRepository = { Add, GetAll, Get, Save, Delete }
