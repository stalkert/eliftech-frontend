import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { CartGood } from '../api/models/cart-good.model';

interface GoodCartListState {
  cartGoods: CartGood[];
}

const initialState: GoodCartListState = {
  cartGoods: [],
};
if (!localStorage.getItem('cartGoods')) {
  localStorage.setItem('cartGoods', JSON.stringify([]));
}

export const goodCartListSlice = createSlice({
  name: 'goodCartList',
  initialState,
  reducers: {
    addCartGood: (state, action: PayloadAction<CartGood>) => {
      const alreadyPresentGood = state.cartGoods.find((good: CartGood) => good.id === action.payload.id);
      state.cartGoods = alreadyPresentGood
        ? state.cartGoods.map((good: CartGood) => {
            if (good.id === alreadyPresentGood.id) {
              const count = good.count + action.payload.count;
              return { ...good, count };
            }
            return good;
          })
        : [...state.cartGoods, action.payload];
      localStorage.setItem('cartGoods', JSON.stringify(state.cartGoods));
    },
    addCartGoodsFromLocalStorage: (state, action: PayloadAction<CartGood[]>) => {
      state.cartGoods = action.payload;
    },
    changeCartGoodCount: (state, action: PayloadAction<CartGood>) => {
      state.cartGoods = state.cartGoods.map((good: CartGood) => {
        if (good.id === action.payload.id) {
          const count = action.payload.count;
          return { ...good, count };
        }
        return good;
      });
      localStorage.setItem('cartGoods', JSON.stringify(state.cartGoods));
    },
    removeCartGood: (state, action: PayloadAction<number>) => {
      state.cartGoods = state.cartGoods.filter((good: CartGood) => good.id !== action.payload);
      localStorage.setItem('cartGoods', JSON.stringify(state.cartGoods));
    },
    setCartGoodInitialState: (state) => {
      state.cartGoods = [];
      localStorage.setItem('cartGoods', JSON.stringify(state.cartGoods));
    },
  },
});

export const selectCartGoods = (state: RootState) => state.goodCartList.cartGoods;
export const selectCartGoodsTypeCount = (state: RootState) => state.goodCartList.cartGoods.length;
export const selectCartGoodsTotalPrice = (state: RootState) =>
  state.goodCartList.cartGoods.reduce((acc, good) => {
    return acc + good.count * good.price;
  }, 0);

export const {
  addCartGood,
  removeCartGood,
  changeCartGoodCount,
  addCartGoodsFromLocalStorage,
  setCartGoodInitialState,
} = goodCartListSlice.actions;
