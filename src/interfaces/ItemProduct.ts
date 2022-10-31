export interface ItemProduct {
  _id: string;
  name: string;
  value: ProductPrice[];
  seller: Seller;
  image?: string;
  url: string;
}

interface ProductPrice {
  value: string;
  date: string;
}

export interface Seller {
  key: string;
  name: string;
}
