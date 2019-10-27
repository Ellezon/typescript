import {StoreState, actionTypes, LOGIN_USER, LOGOUT_USER, SET_ALL_GAMES, DELETE_GAME, ADD_GAME } from './types';

const initialState: StoreState = {
    user: null,
    games: []
 };
  
  
  export function reducer( state = initialState, action: actionTypes ): StoreState {
    switch (action.type) {
      case LOGIN_USER:
        return {
            user: action.payload.user,
            games: state.games
        };
        case LOGOUT_USER:
            return {
              user: action.payload.user,
              games: state.games
            };
          case SET_ALL_GAMES:
            return {
              user: state.user,
              games: action.payload.allGames
            };
          case DELETE_GAME:
            return {
              user: state.user,
              games: state.games.filter(game  => game.id !== action.payload.deleteId)
            };
          case ADD_GAME:
            return {
              user: state.user,
              games: state.games.concat(action.payload.game)
            };
      default:
        return state
    }
  }
  export default reducer;

