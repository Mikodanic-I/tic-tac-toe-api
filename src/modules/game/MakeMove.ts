import { Arg, Mutation, Resolver } from "type-graphql";

import {Game} from "../../entity/Game";
import {GameRepository} from "../../database/GameRepository";
import {MakeMoveInput} from "./makeMove/MakeMoveInput";

@Resolver()
export class MakeMoveResolver {
    @Mutation(() => Game)
    async makeMove(
        @Arg('data') { gameId, player, move }: MakeMoveInput
    ): Promise<Game | null> {

        const activeGame = GameRepository.Get(gameId)

        if (!activeGame) return null

        const positions = JSON.parse(activeGame.positions)

        if (positions[move]) return null // The player already played this position

        positions[move] = player

        // TODO: Trigger the subscribe listener

        console.log(positions);

        return GameRepository.Save(gameId, {...activeGame, positions: JSON.stringify(positions)})
    }
}
