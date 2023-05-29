import React from 'react';
import { Card, InputNumber } from 'antd';
import './good-cart-item.scss';
import goodPhoto from '../../../../common/assets/images/good-photo.jpg';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../../store/store';
import { changeCartGoodCount, removeCartGood } from '../../slice/good-cart-list-slice';
import { CartGood } from '../../api/models/cart-good.model';

export const GoodCartItem: React.FC<CartGood> = ({ id, name, imageUrl, shopId, price, count }) => {
  const dispatch = useAppDispatch();
  const onChangeCount = (goodCount: number | null) => {
    const count = goodCount || 0;
    dispatch(changeCartGoodCount({ id, name, imageUrl, shopId, price, count }));
  };

  const onRemoveCartGood = () => {
    dispatch(removeCartGood(id));
  };

  return (
    <Card className="good-cart-item">
      <div className="good-cart-item__wrapper">
        <img src={goodPhoto} alt="Product" className="good-cart-item__image" />
        <div className="good-cart-item__info">
          <div className="good-cart-item__delete-icon">
            <DeleteOutlined onClick={onRemoveCartGood} />
          </div>
          <div className="good-cart-item__name">{name}</div>
          <div className="good-cart-item__price">Price: {price}</div>
          <div>
            <InputNumber min={1} defaultValue={1} value={count} onChange={onChangeCount} />
          </div>
        </div>
      </div>
    </Card>
  );
};
