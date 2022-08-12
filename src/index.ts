// General modules
import 'reflect-metadata'
import { ApolloServer } from "apollo-server-express"
import * as Express from 'express'
import {buildSchema} from "type-graphql";

// Player module
import {RegisterResolver} from "./modules/player/Register";
import {LoginResolver} from "./modules/player/Login";

// Game module
import {CreateResolver} from "./modules/game/Create";
import {JoinResolver} from "./modules/game/Join";
import {ListResolver} from "./modules/game/List";
import {MakeMoveResolver} from "./modules/game/MakeMove";


const main = async () => {
    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver, CreateResolver, JoinResolver, ListResolver, MakeMoveResolver]
    })

    const apolloServer = new ApolloServer({schema})

    const app = Express()

    await apolloServer.start()
    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log('Server started at http://localhost:4000/graphql')
    })
}

main()
