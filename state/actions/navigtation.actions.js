export const CATEGORY_SELECTED = "CATEGORY_SELECTED";
export const MENU_OPENED = "MENU_OPENED";
export const PAGE_LOADING = "PAGE_LOADING";
export const SET_LOOKUP_VALUE = "SET_LOOKUP_VALUE";
export const AMEND_SEARCH_BY_LOOKUPVALUE = "AMEND_SEARCH_BY_LOOKUPVALUE";

export const SetCategorySelected = (payload) => {
  return {
    type: CATEGORY_SELECTED,
    payload,
  };
};
export const SetMenuOpened = (payload) => {
  return {
    type: MENU_OPENED,
    payload,
  };
};
export const SetPageLoading = (payload) => {
  return {
    type: PAGE_LOADING,
    payload,
  };
};
export const SetLookupValue = (payload) => {
  return {
    type: SET_LOOKUP_VALUE,
    payload,
  };
};
export const AmendSearchBylookUpValue = (payload) => {
  return {
    type: AMEND_SEARCH_BY_LOOKUPVALUE,
    payload,
  };
};
