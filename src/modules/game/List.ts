import {Query, Resolver} from "type-graphql";

import {Game} from "../../entity/Game";
import {GameRepository} from "../../database/GameRepository";

@Resolver()
export class ListResolver {
    @Query(() => [Game])
    async list(): Promise<Game[]> {
        return GameRepository.GetAll()
    }
}
