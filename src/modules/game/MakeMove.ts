import {Arg, Mutation, PubSub, PubSubEngine, Resolver} from "type-graphql";

import {Game} from "../../entity/Game";
import {MakeMoveInput} from "./makeMove/MakeMoveInput";
import {GameService} from "../../services/Game";


@Resolver()
export class MakeMoveResolver {
    @Mutation(() => Game)
    async makeMove(
        @Arg('data') data: MakeMoveInput,
        @PubSub() pubSub: PubSubEngine
    ): Promise<Game | null> {
        const gameService = new GameService()

        return await gameService.makeMove(data, pubSub)
    }
}
