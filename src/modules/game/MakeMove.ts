import {Arg, Mutation, PubSub, PubSubEngine, Resolver} from "type-graphql";

import {Game} from "../../entity/Game";
import {GameRepository} from "../../database/GameRepository";
import {MakeMoveInput} from "./makeMove/MakeMoveInput";
import {getGamewinner} from "./makeMove/getGameStatus";
import {GameSubscribeEvent} from "./gameSubscribe/GameSubscribeEvent";
import {botPlay} from "./makeMove/botPlay";

@Resolver()
export class MakeMoveResolver {
    @Mutation(() => Game)
    async makeMove(
        @Arg('data') { gameId, player, moveX, moveY }: MakeMoveInput,
        @PubSub() pubSub: PubSubEngine
    ): Promise<Game | null> {

        const activeGame = GameRepository.Get(gameId)

        if (!activeGame) return null

        const positions = JSON.parse(activeGame.positions)

        if (positions[moveX][moveY]) return null // The player already played this position

        positions[moveX][moveY] = player

        const gameWinner: number | null = getGamewinner(positions)


        const subscriptionPayload: GameSubscribeEvent = {positions: JSON.stringify(positions), action: "makeMove"}
        const leftMoves = true

        if (gameWinner) {
            subscriptionPayload.player = gameWinner
            subscriptionPayload.action = "win"
        }
        else {
            subscriptionPayload.action = leftMoves ? "makeMove" : "draw"
        }

        if (activeGame.type === "singleplayer" && subscriptionPayload.action === "makeMove") {
            subscriptionPayload.positions = JSON.stringify(botPlay(positions))
        }

        await pubSub.publish(gameId, subscriptionPayload)
        return GameRepository.Save(gameId, {...activeGame, positions: JSON.stringify(positions)})
    }
}
