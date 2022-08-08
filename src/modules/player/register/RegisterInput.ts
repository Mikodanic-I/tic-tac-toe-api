import {Field, InputType} from "type-graphql";
import {IsEmail, Length} from "class-validator";

@InputType()
export class RegisterInput {
    @Field()
    @Length(4, 30)
    username: string

    @Field()
    @IsEmail()
    email: string

    @Field()
    @Length(8, 255)
    password: string
}
