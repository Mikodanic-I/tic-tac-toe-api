import {Arg, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription} from "type-graphql";
import {GameService} from "../services/Game";
import {Game} from "../entity/Game";
import {CreateInput} from "./game/create/CreateInput";
import {GameSubscribeEvent} from "./game/gameSubscribe/GameSubscribeEvent";
import {JoinInput} from "./game/join/JoinInput";
import {MakeMoveInput} from "./game/makeMove/MakeMoveInput";

@Resolver()
export class GameResolver {
    @Query(() => [Game])
    async GetAll(): Promise<Game[]> {
        const gameService = new GameService()

        return gameService.getAll()
    }

    @Query(() => Game)
    async getSingle(
        @Arg('gameId') gameId: string
    ): Promise<Game | null> {
        const gameService = new GameService()

        return gameService.get(gameId)
    }

    @Mutation(() => Game)
    async create(
        @Arg('data') { player, type }: CreateInput
    ): Promise<Game> {
        const gameService = new GameService()

        return gameService.create(player, type)
    }

    @Mutation(() => Game)
    async join(
        @Arg('data') data: JoinInput,
        @PubSub() pubSub: PubSubEngine
    ): Promise<Game | null> {
        const gameService = new GameService()

        return await gameService.join(data, pubSub)
    }

    @Mutation(() => Game)
    async makeMove(
        @Arg('data') data: MakeMoveInput,
        @PubSub() pubSub: PubSubEngine
    ): Promise<Game | null> {
        const gameService = new GameService()

        return await gameService.makeMove(data, pubSub)
    }

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
