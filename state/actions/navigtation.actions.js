export const CATEGORY_SELECTED = "CATEGORY_SELECTED";
export const MENU_OPENED = "MENU_OPENED";
export const PAGE_LOADING = "PAGE_LOADING";
export const FILTER_BY_PRICE = "FILTER_BY_PRICE";

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
