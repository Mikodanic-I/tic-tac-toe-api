import {Arg, Mutation, Resolver} from "type-graphql";
import {Player} from "../entity/Player";
import {LoginInput} from "./player/login/LoginInput";
import {PlayerService} from "../services/Player";
import {RegisterInput} from "./player/register/RegisterInput";

@Resolver()
export class PlayerResolver {
    @Mutation(() => Player)
    async register(
        @Arg('data') data: RegisterInput

    ): Promise<Player> {
        const playerService = new PlayerService()

        return playerService.register(data)
    }

    @Mutation(() => Player, {nullable: true})
    async login(
        @Arg('data') data: LoginInput

    ): Promise<Player | null> {
        const playerService = new PlayerService()

        return playerService.login(data)
    }
}
