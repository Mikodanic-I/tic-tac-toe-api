import {Arg, Mutation, PubSub, PubSubEngine, Resolver} from "type-graphql";

import {Game} from "../../entity/Game";
import {JoinInput} from "./join/JoinInput";
import {GameService} from "../../services/Game";

@Resolver()
export class JoinResolver {
    @Mutation(() => Game)
    async join(
        @Arg('data') data: JoinInput,
        @PubSub() pubSub: PubSubEngine
    ): Promise<Game | null> {
        const gameService = new GameService()

        return await gameService.join(data, pubSub)
    }
}
