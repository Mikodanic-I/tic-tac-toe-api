import {Arg, Mutation, Resolver} from "type-graphql";
import {Player} from "../../entity/Player";
import {LoginInput} from "./login/LoginInput";
import {PlayerService} from "../../services/Player";

@Resolver()
export class LoginResolver {
    @Mutation(() => Player, {nullable: true})
    async login(
        @Arg('data') data: LoginInput

    ): Promise<Player | null> {
        const playerService = new PlayerService()

        return playerService.login(data)
    }
}
