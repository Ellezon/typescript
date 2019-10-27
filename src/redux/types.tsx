export const LOGIN_USER = 'LOGIN_USER';

export const LOGOUT_USER = 'LOGOUT_USER';

export const SET_ALL_GAMES = 'SET_ALL_GAMES';

export const DELETE_GAME = 'DELETE_GAME';

export const ADD_GAME = "ADD_GAME";

export interface StoreState {
    user: any | null,
    games: Game[]
}

export interface Game {
    id: number;
    name: string;
    play_url: string;
    logo_url: string;
}

interface loginUserAction {
    type: typeof LOGIN_USER
    payload: {user: any}
}

interface logoutUserAction {
    type: typeof LOGOUT_USER
    payload: {user: any}
}


interface setAllGamesAction {
    type: typeof SET_ALL_GAMES
    payload: {allGames: any }
}

interface deleteGameAction {
    type: typeof DELETE_GAME
    payload: {deleteId: number }
}

interface addGameAction {
    type: typeof ADD_GAME
    payload: {game: any }
}


export type actionTypes = addGameAction | deleteGameAction | setAllGamesAction | logoutUserAction | loginUserAction;

