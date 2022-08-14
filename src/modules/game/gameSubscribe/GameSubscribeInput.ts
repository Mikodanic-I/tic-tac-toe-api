import {Field, InputType} from "type-graphql";

@InputType()
export class GameSubscribeInput {
    @Field()
    gameId: string

    @Field()
    player: number
}
