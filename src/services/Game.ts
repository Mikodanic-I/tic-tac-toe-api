import {GameRepository} from "../database/GameRepository";
import {v4 as uuidv4} from "uuid";
import {JoinInput} from "../modules/game/join/JoinInput";
import {PubSubEngine} from "type-graphql";
import {getGameStatus} from "../modules/game/makeMove/getGameStatus";
import {GameSubscribeEvent} from "../modules/game/gameSubscribe/GameSubscribeEvent";
import {botPlay} from "../modules/game/makeMove/botPlay";
import {MakeMoveInput} from "../modules/game/makeMove/MakeMoveInput";

export class GameService {
    create(player: number, type: string) {
        return GameRepository.Add({
            id: uuidv4(),
            player1: player,
            // Stringified array
            positions: '[[null,null,null],[null,null,null],[null,null,null]]',
            type
        })
    }

    get(gameId: string) {
        return GameRepository.Get(gameId)
    }

    getAll() {
        return GameRepository.GetAll()
    }

    async join(data: JoinInput, pubSub: PubSubEngine) {
        const {gameId, player} = data
        const activeGame = GameRepository.Get(gameId)

        if (!activeGame) return null

        const joinedGame = GameRepository.Save(gameId, {...activeGame, player2: player})

        await pubSub.publish(gameId, {action: "join", player: player})

        return joinedGame
    }

    async makeMove(data: MakeMoveInput, pubSub: PubSubEngine) {
        const { gameId, player, moveX, moveY } = data

        const activeGame = GameRepository.Get(gameId)

        if (!activeGame) return null

        const positions = JSON.parse(activeGame.positions)

        if (positions[moveX][moveY]) return null // The player already played this position

        positions[moveX][moveY] = player

        const gameStatus: string = getGameStatus(positions)

        const subscriptionPayload: GameSubscribeEvent = {positions: JSON.stringify(positions), action: gameStatus}


        if (gameStatus === "win") {
            subscriptionPayload.player = player
            activeGame.winner = player
        }

        const savedGame = GameRepository.Save(gameId, {...activeGame, positions: JSON.stringify(positions)})
        await pubSub.publish(gameId, subscriptionPayload)

        if (activeGame.type === "singleplayer" && subscriptionPayload.action === "makeMove" && player !== -1) {
            botPlay({...activeGame, positions}, pubSub)
        }

        return savedGame
    }
}
