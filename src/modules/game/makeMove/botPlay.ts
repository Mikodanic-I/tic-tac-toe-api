import {GameService} from "../../../services/Game";
import {Game} from "../../../entity/Game";
import {PubSubEngine} from "type-graphql";

export function botPlay(game: Game, pubSub: PubSubEngine) {
    const gameService = new GameService()

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (!game.positions[x][y]) {
                gameService.makeMove({gameId: game.id, player: -1, moveX: x, moveY: y}, pubSub)
                return
            }
        }
    }
}
