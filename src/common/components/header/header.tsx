import React from 'react';
import { Layout } from 'antd';
import './header.scss';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import { selectCartGoodsTypeCount } from '../../../features/shopping-cart/slice/good-cart-list-slice';

const { Header } = Layout;

const PageHeader = () => {
  const cartGoodsTypeCount = useAppSelector(selectCartGoodsTypeCount);

  return (
    <Header className="header">
      <div className="header__link">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Shop
        </NavLink>
      </div>
      <div className="header__link shopping-cart">
        <NavLink to="/shopping-cart" className={({ isActive }) => (isActive ? 'active' : '')}>
          Shopping Cart
        </NavLink>
        {cartGoodsTypeCount ? <div className="shopping-cart__good-type-count">{cartGoodsTypeCount} </div> : ''}
      </div>
    </Header>
  );
};

export default PageHeader;
