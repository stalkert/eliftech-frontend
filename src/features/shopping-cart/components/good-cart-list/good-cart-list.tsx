import React from 'react';
import { GoodCartItem } from '../good-cart-item/good-cart-item';
import './good-cart-list.scss';
import { useAppSelector } from '../../../../store/store';
import { selectCartGoods } from '../../slice/good-cart-list-slice';
import { CartGood } from '../../api/models/cart-good.model';

const GoodCartList: React.FC = () => {
  const cartGoods = useAppSelector(selectCartGoods);

  return (
    <div>
      {cartGoods.length ? (
        cartGoods.map((good: CartGood) => {
          return <GoodCartItem key={good.id} {...good} />;
        })
      ) : (
        <p> No goods in cart.</p>
      )}
    </div>
  );
};

export default GoodCartList;
