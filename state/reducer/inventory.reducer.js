import { SET_SEARCH_RESULT } from "../actions/inventory.actions";

export const InventoryReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_SEARCH_RESULT:
      return {
        ...state,
        searchResult: payload,
      };
    default:
      return state;
  }
};
