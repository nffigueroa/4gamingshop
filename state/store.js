import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import allReducer from "./reducer/index";
import StateLoader from "../src/common/util";
import { composeWithDevTools } from "redux-devtools-extension";

export function initializeStore(initialState = {}) {
  const stateLoader = new StateLoader();
  const store = createStore(
    allReducer,
    stateLoader.loadState(),
    composeWithDevTools(applyMiddleware(thunk))
  );
  store.subscribe(() => stateLoader.saveState(store.getState()));
  return store;
}
