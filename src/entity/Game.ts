import {Field, ObjectType, ID} from "type-graphql";

@ObjectType()
export class Game {
    @Field(() => ID)
    id: string

    // Player fields are Player IDs (Foreign Key)
    @Field()
    player1: number
    @Field({nullable: true})
    player2?: number // It can be null if type = "singleplayer"

    @Field()
    positions: string

    @Field({nullable: true})
    winner?: number // Player ID

    @Field()
    type: string // "singleplayer" | "multiplayer"
}
