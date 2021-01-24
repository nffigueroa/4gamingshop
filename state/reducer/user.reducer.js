import {
  REMOVE_TKN,
  SET_USER_PROPERTIES,
  ADD_TKN,
} from "../actions/user.actions";

export const UserReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_USER_PROPERTIES:
      return {
        ...state,
        userProperties: payload,
      };
    case REMOVE_TKN:
      return {
        ...state,
        tkn: null,
        userProperties: null,
      };
    case ADD_TKN:
      return {
        ...state,
        tkn: payload,
      };
    default:
      return state;
  }
};
