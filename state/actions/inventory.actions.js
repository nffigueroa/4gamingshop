export const SET_SEARCH_RESULT = "SET_SEARCH_RESULT";
export const SET_INITIAL_RESULTS = "SET_INITIAL_RESULTS";

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
