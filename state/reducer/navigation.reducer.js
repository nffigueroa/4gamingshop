import { CATEGORY_SELECTED, MENU_OPENED } from "../actions/navigtation.actions";

export const NavigationReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CATEGORY_SELECTED:
      return {
        ...state,
        categorySelected: payload,
      };
    case MENU_OPENED:
      return {
        ...state,
        menuOpened: payload,
      };
    default:
      return state;
  }
};
