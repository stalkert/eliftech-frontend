import React, { FC, useEffect } from 'react';
import './app.scss';
import { routes } from './core/routes';
import { Route, Routes } from 'react-router-dom';
import { setCurrentShopId } from './features/shop/slice/good-list-slice';
import { addCartGoodsFromLocalStorage, selectCartGoods } from './features/shopping-cart/slice/good-cart-list-slice';
import { useAppDispatch, useAppSelector } from './store/store';

interface AppProps {}

export const App: FC<AppProps> = () => {
  const cartGoods = useAppSelector(selectCartGoods);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const cartGoodsFromLocalStorageRaw = localStorage.getItem('cartGoods');
    if (!cartGoods.length && cartGoodsFromLocalStorageRaw) {
      const cartGoodsFromLocalStorage = JSON.parse(cartGoodsFromLocalStorageRaw);
      const currentShopId = cartGoodsFromLocalStorage.length && cartGoodsFromLocalStorage[0].shopId;
      dispatch(setCurrentShopId(currentShopId));
      dispatch(addCartGoodsFromLocalStorage(cartGoodsFromLocalStorage));
    }
  }, []);
  return (
    <>
      <Routes>
        {Object.values(routes).map((route) => {
          return <Route key={`route-${route.path}`} path={route.path} element={route.element} />;
        })}
      </Routes>
    </>
  );
};
export default App;
