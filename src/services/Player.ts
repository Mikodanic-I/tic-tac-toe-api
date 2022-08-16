import {PlayerRepository} from "../database/PlayerRepository";
import {LoginInput} from "../modules/player/login/LoginInput";
import {RegisterInput} from "../modules/player/register/RegisterInput";

export class PlayerService {
    login(data: LoginInput) {
        const {email, password} = data
        const players = PlayerRepository.GetAll()

        const loggedInPlayer = players.find(player => player.email === email)

        if (loggedInPlayer?.password !== password) return null // This is not a good practice, usually password needs to be hashed with an API key...

        return loggedInPlayer
    }

    register(data: RegisterInput) {
        return PlayerRepository.Add(data)
    }
}
