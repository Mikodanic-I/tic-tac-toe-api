import 'reflect-metadata'

import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import * as Express from 'express'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { buildSchema } from "type-graphql";

// Player
import {RegisterResolver} from "./modules/player/Register";
import {LoginResolver} from "./modules/player/Login";

// Game
import {CreateResolver} from "./modules/game/Create";
import {JoinResolver} from "./modules/game/Join";
import {ListResolver} from "./modules/game/List";
import {MakeMoveResolver} from "./modules/game/MakeMove";
import {GameSubscribeResolver} from "./modules/game/GameSubscribe";


const PORT = 4000;

const main = async () => {
    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver, CreateResolver, JoinResolver, ListResolver, MakeMoveResolver, GameSubscribeResolver]
    })

    const app = Express();
    const httpServer = createServer(app);

    // Web socket for subscriptions
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });

    // TODO: research later what these things and plugins are for...
    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
    });
    await server.start();
    server.applyMiddleware({ app });

    httpServer.listen(PORT, () => {
        console.log(
            `Server is now running on http://localhost:${PORT}${server.graphqlPath}`,
        );
    });
}

main()
