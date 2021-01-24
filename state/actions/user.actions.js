export const SET_USER_PROPERTIES = "SET_USER_PROPERTIES";
export const ADD_TKN = "ADD_TKN";
export const REMOVE_TKN = "REMOVE_TKN";

export const SetUserProperties = (payload) => {
  return {
    type: SET_USER_PROPERTIES,
    payload,
  };
};

export const AddTKN = (payload) => {
  return {
    type: ADD_TKN,
    payload,
  };
};
export const RemoveTKN = (payload) => {
  return {
    type: REMOVE_TKN,
    payload,
  };
};
