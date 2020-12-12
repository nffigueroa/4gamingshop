import {
  SET_INITIAL_RESULTS,
  SET_SEARCH_RESULT,
} from "../actions/inventory.actions";

export const InventoryReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_SEARCH_RESULT:
      return {
        ...state,
        searchResult: payload,
      };
    case SET_INITIAL_RESULTS:
      return {
        ...state,
        initialResults: payload,
      };
    default:
      return state;
  }
};
