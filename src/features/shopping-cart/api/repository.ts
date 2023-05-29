import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../core/api/base-query';
import { CreateOrderRequestParams, Order } from './models/cart-good.model';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, CreateOrderRequestParams>({
      query: (data) => {
        return {
          url: `/orders`,
          method: 'POST',
          data,
        };
      },
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
