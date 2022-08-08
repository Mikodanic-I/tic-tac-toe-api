import 'reflect-metadata'

import { ApolloServer } from "apollo-server-express"
import * as Express from 'express'
import {buildSchema} from "type-graphql";
import {RegisterResolver} from "./modules/player/Register";
import {LoginResolver} from "./modules/player/Login";


const main = async () => {
    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver]
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
