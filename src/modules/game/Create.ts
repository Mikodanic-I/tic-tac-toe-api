import {Arg, Mutation, Resolver} from "type-graphql";

import {CreateInput} from "./create/CreateInput";
import {Game} from "../../entity/Game";
import {GameService} from "../../services/Game";

@Resolver()
export class CreateResolver {
    @Mutation(() => Game)
    async create(
        @Arg('data') { player, type }: CreateInput
    ): Promise<Game> {
        const gameService = new GameService()

        return gameService.create(player, type)
    }
}
