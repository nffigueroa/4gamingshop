import { combineReducers } from "redux";
import { InventoryReducer } from "./inventory.reducer";
import { NavigationReducer } from "./navigation.reducer";

export default combineReducers({
  inventory: InventoryReducer,
  navigation: NavigationReducer,
});
