import {
  CATEGORY_SELECTED,
  MENU_OPENED,
  PAGE_LOADING,
} from "../actions/navigtation.actions";

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
    case PAGE_LOADING:
      return {
        ...state,
        page_loading: payload,
      };
    default:
      return state;
  }
};
