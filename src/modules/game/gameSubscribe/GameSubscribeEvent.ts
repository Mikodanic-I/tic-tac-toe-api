import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class GameSubscribeEvent {
    @Field()
    positions: string

    @Field()
    status: string
}
