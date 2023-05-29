import { Good } from '../../../shop/api/models/good.model';

export interface CartGood extends Good {
  count: number;
}
export interface Customer {
  name: string;
  email: string;
  phone: number;
  address: string;
}

export interface Order {
  id?: number;
  cartGoods: CartGood[];
  customer: Customer;
}

export interface CreateOrderRequestParams {
  cartGoods: CartGood[];
  customer: Customer;
}
