import {Field, InputType} from "type-graphql";

@InputType()
export class CreateInput {
    @Field()
    player: number

    @Field()
    type: string
}
