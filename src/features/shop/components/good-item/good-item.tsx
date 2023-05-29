import React from 'react';
import { Button, Card } from 'antd';
import './good-item.scss';
import goodPhoto from '../../../../common/assets/images/good-photo.jpg';
import { useAppDispatch } from '../../../../store/store';
import { addCartGood } from '../../../shopping-cart/slice/good-cart-list-slice';
import { Good } from '../../api/models/good.model';

export const GoodItem: React.FC<Good> = ({ id, name, imageUrl, shopId, price }) => {
  const dispatch = useAppDispatch();
  const onAddGoodToCart = () => {
    dispatch(addCartGood({ id, name, imageUrl, price, shopId, count: 1 }));
  };

  return (
    <Card className="good-item">
      <div className="good-item__wrapper">
        <img src={goodPhoto} alt="Product" className="good-item__image" />
        <div className="good-item__info">
          <div className="good-item__name">{name}</div>
          <div className="good-item__price">Price: {price}</div>
          <Button className="good-item__button" type="primary" onClick={onAddGoodToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};
