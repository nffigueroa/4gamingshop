export const SET_SEARCH_RESULT = "SET_SEARCH_RESULT";
export const SET_INITIAL_RESULTS = "SET_INITIAL_RESULTS";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_PRODUCTS_BY_CATEGORY = "SET_PRODUCTS_BY_CATEGORY";

export const SetSearchResult = (payload) => {
  return {
    type: SET_SEARCH_RESULT,
    payload,
  };
};
export const SetInitialResults = (payload) => {
  return {
    type: SET_INITIAL_RESULTS,
    payload,
  };
};

export const SetCagories = (payload) => {
  return {
    type: SET_CATEGORIES,
    payload,
  };
};

export const SetProductsByCategory = (payload) => {
  return {
    type: SET_PRODUCTS_BY_CATEGORY,
    payload,
  };
};
