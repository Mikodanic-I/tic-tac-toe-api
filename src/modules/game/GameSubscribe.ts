import {Subscription, Resolver, Root, Arg} from "type-graphql";
import {GameSubscribeEvent} from "./gameSubscribe/GameSubscribeEvent";

@Resolver()
export class GameSubscribeResolver {
    @Subscription({
        topics: ({ args }) => args.gameId
    })
    newGameEvent(
        @Root() gamePayload: any,
        @Arg('gameId') gameId: string
    ): GameSubscribeEvent {
        console.log(gamePayload, gameId);
        return { positions: "kurcina", status: "jos veca..." }
    }
}
