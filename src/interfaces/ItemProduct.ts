export interface ItemProduct {
  _id: string;
  name: string;
  value: string;
  seller: Seller;
  image?: string;
}

export interface Seller {
  key: string;
  name: string;
}
