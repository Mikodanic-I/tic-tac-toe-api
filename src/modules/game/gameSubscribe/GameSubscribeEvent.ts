import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class GameSubscribeEvent {
    @Field()
    positions?: string

    @Field({nullable: true})
    player?: string

    @Field()
    action: string // "join" |
}
