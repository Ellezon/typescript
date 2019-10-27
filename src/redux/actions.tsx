
import { 
    actionTypes,
    LOGIN_USER, 
    LOGOUT_USER, 
    SET_ALL_GAMES,
    DELETE_GAME,
    ADD_GAME
} from './types'

export function userLogin(user: any): actionTypes {
    return {
        type: LOGIN_USER,
        payload: { user }
    }
}

export function userLogout(user: any): actionTypes {
    return {
        type: LOGOUT_USER,
        payload: { user }
    }
}

export function setAllGames(games: Array<any>): actionTypes {
    return {
        type: SET_ALL_GAMES,
        payload: { allGames: games }
    }
}

export function deleteGame(id: number): actionTypes {
    return {
        type: DELETE_GAME,
        payload: { deleteId: id }
    }
}

export function addGame(game: any): actionTypes {
    return {
        type: ADD_GAME,
        payload: { game }
    }
}