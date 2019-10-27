import { createStore  } from "redux";
import { reducer } from "./reducers";
import { devToolsEnhancer } from 'redux-devtools-extension';

export type AppState = ReturnType<typeof reducer>;

export function configureStore() {

    const store = createStore(reducer,  devToolsEnhancer({}));
    return store;
}

