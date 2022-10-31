import { useState, useEffect } from 'react';
import { filterByPriceEnum } from '../enhandcer/withRedux';
import { ItemProduct } from '../interfaces/ItemProduct';

/**
 * It filters a list of products by price and store name, and if a search term is provided, it filters
 * the list by that search term.
 * @param priceFilter - string
 * @param productList - ItemProduct[] = [
 * @param {string} storeName - string,
 * @param {string} searchBy - string =&gt; the search term
 * @returns An array of ItemProduct objects.
 */
export const filterProductSearch = (
  priceFilter: filterByPriceEnum,
  productList: ItemProduct[],
  storeName: string,
  searchBy: string
): ItemProduct[] => {
  if (!productList || !productList.length || !priceFilter) {
    return;
  }
  const filteredByPrice = productList.sort((a: ItemProduct, b: ItemProduct) =>
    priceFilter === filterByPriceEnum.UP
      ? Number(b.value[a.value.length - 1].value) -
        Number(a.value[b.value.length - 1].value)
      : Number(a.value[a.value.length - 1].value) -
        Number(b.value[b.value.length - 1].value)
  );
  if (storeName === 'todos') {
    return filteredByPrice;
  }
  const filteredByStore = filteredByPrice.filter(
    (item: ItemProduct) => item.seller.key === storeName
  );
  console.log(searchBy);
  if (!searchBy || searchBy.length < 3) {
    return filteredByStore;
  }

  const finalFilter = filteredByStore.filter(
    (item: ItemProduct) =>
      item.name && item.name.toUpperCase().includes(searchBy.toUpperCase())
  );
  console.log(finalFilter);

  return finalFilter;
};
