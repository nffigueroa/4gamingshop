import {
  SET_CATEGORIES,
  SET_FILTER_BY_PRICE,
  SET_INITIAL_RESULTS,
  SET_PRODUCTS_BY_CATEGORY,
  SET_SEARCH_RESULT,
  SET_FILTER_BY_STORE,
  SET_SPONSORS,
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
    case SET_FILTER_BY_PRICE:
      return {
        ...state,
        filterByPrice: payload,
      };
    case SET_FILTER_BY_STORE:
      return {
        ...state,
        filterByStore: payload,
      };
    case SET_SPONSORS:
      return {
        ...state,
        sponsors: payload,
      };
    default:
      return state;
  }
};
