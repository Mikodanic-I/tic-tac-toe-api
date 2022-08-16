import {Query, Resolver} from "type-graphql";

import {Game} from "../../entity/Game";
import {GameService} from "../../services/Game";

@Resolver()
export class GetAllResolver {
    @Query(() => [Game])
    async GetAll(): Promise<Game[]> {
        const gameService = new GameService()

        return gameService.getAll()
    }
}
