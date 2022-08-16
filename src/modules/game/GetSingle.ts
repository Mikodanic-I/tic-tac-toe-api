import {Arg, Query, Resolver} from "type-graphql";

import {Game} from "../../entity/Game";
import {GameRepository} from "../../database/GameRepository";

@Resolver()
export class GetSingleResolver {
    @Query(() => Game)
    async getSingle(
        @Arg('gameId') gameId: string
    ): Promise<Game | null> {
        return GameRepository.Get(gameId)
    }
}
