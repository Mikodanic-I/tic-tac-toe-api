import {Subscription, Resolver, Root, Arg} from "type-graphql";
import {GameSubscribeEvent} from "./gameSubscribe/GameSubscribeEvent";

@Resolver()
export class GameSubscribeResolver {
    @Subscription({
        topics: ({ args }) => args.gameId
    })
    newGameEvent(
        @Root() gamePayload: any,
        // @ts-ignore
        @Arg('gameId') gameId: string
    ): GameSubscribeEvent {
        return gamePayload
    }
}
