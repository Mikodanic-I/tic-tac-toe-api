import {Field, InputType} from "type-graphql";

@InputType()
export class MakeMoveInput {
    @Field()
    gameId: string

    @Field()
    player: number

    @Field()
    moveX: number

    @Field()
    moveY: number
}
