export interface Good {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  shopId: number;
}

export interface GoodListRequestParams {
  shopId: number;
  page: number;
  limit: number;
}
