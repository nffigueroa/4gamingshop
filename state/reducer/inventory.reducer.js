import {
  SET_CATEGORIES,
  SET_INITIAL_RESULTS,
  SET_PRODUCTS_BY_CATEGORY,
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
    case SET_CATEGORIES:
      return {
        ...state,
        listCategories: payload,
      };
    case SET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        productsByCategory: payload,
      };
    default:
      return state;
  }
};
