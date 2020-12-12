import { combineReducers } from "redux";
import { InventoryReducer } from "./inventory.reducer";

export default combineReducers({
  inventory: InventoryReducer,
});
