import {Field, InputType} from "type-graphql";

@InputType()
export class JoinInput {
    @Field()
    gameId: string

    @Field()
    player: number
}
