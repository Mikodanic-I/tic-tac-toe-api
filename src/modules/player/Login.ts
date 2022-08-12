import {Arg, Mutation, Resolver} from "type-graphql";
import {Player} from "../../entity/Player";
import {PlayerRepository} from "../../database/PlayerRepository";
import {LoginInput} from "./login/LoginInput";

@Resolver()
export class LoginResolver {
    @Mutation(() => Player, {nullable: true})
    async login(
        @Arg('data') { email, password }: LoginInput

    ): Promise<Player | null> {
        const players = PlayerRepository.GetAll()

        const loggedInPlayer = players.find(player => player.email === email)

        if (loggedInPlayer?.password !== password) return null // This is not a good practice, usually password needs to be hashed with an API key...

        return loggedInPlayer
    }
}
