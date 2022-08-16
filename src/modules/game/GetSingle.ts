import {Arg, Query, Resolver} from "type-graphql";

import {Game} from "../../entity/Game";
import {GameRepository} from "../../database/GameRepository";

@Resolver()
export class GetSingleResolver {
    @Query(() => Game)
    async getSingle(
        @Arg('gameId') gameId: string
    ): Promise<Game | null> {

        console.log(gameId);
        const game = GameRepository.Get(gameId)

        console.log(game);
        return game
    }
}
