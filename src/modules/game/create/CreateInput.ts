import {Field, InputType} from "type-graphql";

@InputType()
export class CreateInput {
    @Field()
    player: number // ID (Usually here would go the JWT token but this is a simple version)

    @Field()
    type: string
}
