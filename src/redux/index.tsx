import { createStore } from "redux";
import { reducer } from "./reducers";

export type AppState = ReturnType<typeof reducer>;

export function configureStore() {
  const store = createStore(
    reducer
 );
  
  return store;
}

