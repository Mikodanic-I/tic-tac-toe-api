import {Arg, Query, Resolver} from "type-graphql";

import {Game} from "../../entity/Game";
import {GameService} from "../../services/Game";

@Resolver()
export class GetSingleResolver {
    @Query(() => Game)
    async getSingle(
        @Arg('gameId') gameId: string
    ): Promise<Game | null> {
        const gameService = new GameService()

        return gameService.get(gameId)
    }
}
