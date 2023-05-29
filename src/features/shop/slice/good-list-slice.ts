import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { Good } from '../api/models/good.model';

interface GoodListState {
  goods: Good[];
  currentShopId: number | null;
  currentPage: number;
  isLastGood: boolean;
}

const initialState: GoodListState = {
  goods: [],
  currentShopId: null,
  currentPage: 1,
  isLastGood: false,
};

export const goodListSlice = createSlice({
  name: 'goodList',
  initialState,
  reducers: {
    addGoods: (state, action: PayloadAction<Good[]>) => {
      state.goods = [...state.goods, ...action.payload];
    },
    setGoodsInitialState: (state) => {
      state.goods = [];
      state.currentShopId = null;
      state.currentPage = 1;
      state.isLastGood = false;
    },
    setCurrentShopId: (state, action: PayloadAction<number>) => {
      state.currentShopId = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setIsLastGood: (state, action: PayloadAction<boolean>) => {
      state.isLastGood = action.payload;
    },
  },
});

export const selectGoods = (state: RootState) => state.goodList.goods;
export const selectCurrentShopId = (state: RootState) => state.goodList.currentShopId;
export const selectIsLastGood = (state: RootState) => state.goodList.isLastGood;
export const selectCurrentPage = (state: RootState) => state.goodList.currentPage;

export const { addGoods, setGoodsInitialState, setCurrentShopId, setIsLastGood, setCurrentPage } =
  goodListSlice.actions;
