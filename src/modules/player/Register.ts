import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Player} from "../../entity/Player";
import {RegisterInput} from "./register/RegisterInput";
import {PlayerService} from "../../services/Player";

@Resolver()
export class RegisterResolver {
    @Query(() => String)
    async hello() {
        return "Hello World!"
    }

    @Mutation(() => Player)
    async register(
        @Arg('data') data: RegisterInput

    ): Promise<Player> {
        const playerService = new PlayerService()

        return playerService.register(data)
    }
}
