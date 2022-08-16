# Tic Tac Toe API

Tic Tac Toe API is an API made in GraphQL, which provides a connection between 2 users to play Tic Tac Toe.

## Quick start

For the installation you must have **npm** installed.
<br><br>
Install dependencies:
```bash
$ npm install
```
Start the server:
```shell
$ npm start
```
View the GraphQL documentation at http://localhost:4000/graphql 
<br>
_Default port 4000 is defined in the start script in **package.json**_

## Architecture
There are 2 entities in the API
 - Player
 - Game
<br>

Resolvers are divided into parts
 - Player
   - Login
   - Register
 - Game
   - Create
   - GameSubscribe
   - Join
   - GetAll
   - GetSingle
   - MakeMove

When creating or joining the game, players subscribe to the game subscription and listen to events when moves are made.
<br>
Every move the board is calculated if there are any winners and the event is modified accordingly 
<br>
Data storage is currently handled using **Repositories** but in the production it should be connected to the database.
