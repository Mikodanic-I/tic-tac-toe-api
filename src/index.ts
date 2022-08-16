import 'reflect-metadata'

import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import * as Express from 'express'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { buildSchema } from "type-graphql";

// Resolvers
import {PlayerResolver} from "./modules/Player";
import {GameResolver} from "./modules/Game";


const main = async () => {
    const schema = await buildSchema({
        resolvers: [PlayerResolver, GameResolver]
    })

    const app = Express();
    const httpServer = createServer(app);

    // Web socket for subscriptions
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });

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

    httpServer.listen(process.env.PORT, () => {
        console.log(
            `Server is now running on http://localhost:${process.env.PORT}${server.graphqlPath}`,
        );
    });
}

main()
