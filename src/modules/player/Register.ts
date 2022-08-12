import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Player} from "../../entity/Player";
import {PlayerRepository} from "../../database/PlayerRepository";
import {RegisterInput} from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
    @Query(() => String)
    async hello() {
        return "Hello World!"
    }

    @Mutation(() => Player)
    async register(
        @Arg('data') { username, email, password }: RegisterInput

    ): Promise<Player> {
        return PlayerRepository.Add({ username, email, password })
    }
}
