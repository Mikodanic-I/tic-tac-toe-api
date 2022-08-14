import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class GameSubscribeEvent {
    @Field()
    positions?: string

    @Field({nullable: true})
    player?: number

    @Field()
    action: string // "join" |
}
