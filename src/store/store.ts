import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { shopApi } from '../features/shop/api/repository';
import { goodListSlice } from '../features/shop/slice/good-list-slice';
import { goodCartListSlice } from '../features/shopping-cart/slice/good-cart-list-slice';
import { orderApi } from '../features/shopping-cart/api/repository';

export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [goodListSlice.name]: goodListSlice.reducer,
    [goodCartListSlice.name]: goodCartListSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware, orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type GetRootState = typeof store.getState;
