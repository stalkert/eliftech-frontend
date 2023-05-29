import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../core/api/base-query';
import { Good, GoodListRequestParams } from './models/good.model';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getGoods: builder.query<Good[], GoodListRequestParams>({
      query: ({ shopId, page, limit }) => {
        return {
          url: `/shops/${shopId}/goods`,
          method: 'get',
          params: {
            page,
            limit,
          },
        };
      },
    }),
  }),
});

export const { useLazyGetGoodsQuery } = shopApi;
