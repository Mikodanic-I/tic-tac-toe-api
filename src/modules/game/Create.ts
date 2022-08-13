import {Arg, Mutation, Resolver} from "type-graphql";
import {v4 as uuidv4} from 'uuid'

import {CreateInput} from "./create/CreateInput";
import {Game} from "../../entity/Game";
import {GameRepository} from "../../database/GameRepository";

@Resolver()
export class CreateResolver {
    @Mutation(() => Game)
    async create(
        @Arg('data') { player, type }: CreateInput
    ): Promise<Game> {
        return GameRepository.Add({
            id: uuidv4(),
            player1: player,
            player2: undefined,
            // Stringified object
            positions: '{"pos00":null,"pos01":null,"pos02":null,"pos10":null,"pos11":null,"pos12":null,"pos20":null,"pos21":null,"pos22":null}',
            winner: undefined,
            type
        })
    }
}
