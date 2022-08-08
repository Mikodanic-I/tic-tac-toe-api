import {Field, ObjectType, ID} from "type-graphql";

@ObjectType()
export class Player {
    @Field(() => ID)
    id?: number // Set to optional so ID can be added in the PlayerRepository

    @Field()
    username: string

    @Field()
    email: string

    password: string
}
