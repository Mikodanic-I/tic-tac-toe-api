import { Arg, Mutation, Resolver } from "type-graphql";

import {Game} from "../../entity/Game";
import {GameRepository} from "../../database/GameRepository";
import {JoinInput} from "./join/JoinInput";

@Resolver()
export class JoinResolver {
    @Mutation(() => Game)
    async join(
        @Arg('data') { gameId, player }: JoinInput
    ): Promise<Game | null> {

        const activeGame = GameRepository.Get(gameId)

        if (!activeGame) return null

        const joinedGame = GameRepository.Save(gameId, {...activeGame, player2: player})
        // TODO: Subscribe to the joined game


        return joinedGame
    }
}
