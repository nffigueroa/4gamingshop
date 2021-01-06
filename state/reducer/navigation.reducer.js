import {
  CATEGORY_SELECTED,
  MENU_OPENED,
  PAGE_LOADING,
  SET_LOOKUP_VALUE,
  AMEND_SEARCH_BY_LOOKUPVALUE,
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
    case SET_LOOKUP_VALUE:
      return {
        ...state,
        lookupValue: payload,
      };
    case AMEND_SEARCH_BY_LOOKUPVALUE:
      return {
        ...state,
        searchBy: payload,
      };
    default:
      return state;
  }
};
