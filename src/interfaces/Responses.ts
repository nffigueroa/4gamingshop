import { ItemProduct, Seller } from "./ItemProduct";

export interface ResponseSearch {
  response: Array<ItemProduct>;
  sponsors: Array<Seller>;
}

export interface ResponseCategories {
  response: Array<string>;
  status: number;
}
