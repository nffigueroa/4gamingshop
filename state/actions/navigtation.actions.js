export const CATEGORY_SELECTED = "CATEGORY_SELECTED";
export const MENU_OPENED = "MENU_OPENED";

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
