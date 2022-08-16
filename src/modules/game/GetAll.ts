import {Query, Resolver} from "type-graphql";

import {Game} from "../../entity/Game";
import {GameRepository} from "../../database/GameRepository";

@Resolver()
export class GetAllResolver {
    @Query(() => [Game])
    async GetAll(): Promise<Game[]> {
        return GameRepository.GetAll()
    }
}
