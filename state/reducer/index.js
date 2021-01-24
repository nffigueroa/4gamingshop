import { combineReducers } from "redux";
import { InventoryReducer } from "./inventory.reducer";
import { NavigationReducer } from "./navigation.reducer";
import { UserReducer } from "./user.reducer";

export default combineReducers({
  inventory: InventoryReducer,
  navigation: NavigationReducer,
  user: UserReducer,
});
