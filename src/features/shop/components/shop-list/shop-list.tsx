import React, { useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../../store/store';
import { selectCartGoodsTypeCount } from '../../../shopping-cart/slice/good-cart-list-slice';
import { selectCurrentShopId } from '../../slice/good-list-slice';

interface ShopListProps {
  onShopClick: (shopId: number) => void;
}
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  disabled?: boolean,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    disabled,
    label,
    type,
  } as MenuItem;
}

let items: MenuItem[] = [
  getItem('Nike', '1', <ShopOutlined />),
  getItem('Adidas', '2', <ShopOutlined />),
  getItem('Puma', '3', <ShopOutlined />),
  getItem('Skechers', '4', <ShopOutlined />),
];

const ShopList: React.FC<ShopListProps> = ({ onShopClick }) => {
  const [current, setCurrent] = useState('');
  const cartGoodsTypeCount = useAppSelector(selectCartGoodsTypeCount);
  const currentShopId = useAppSelector(selectCurrentShopId);

  const onClick: MenuProps['onClick'] = (e) => {
    onShopClick(+e.key);
    setCurrent(e.key);
  };
  if (cartGoodsTypeCount > 0) {
    items = items.map((item) => {
      if (item && Number(item.key) === currentShopId) {
        return { ...item, disabled: false } as MenuItem;
      } else {
        return { ...item, disabled: true } as MenuItem;
      }
    });
  } else {
    items = items.map((item) => ({ ...item, disabled: false } as MenuItem));
  }

  return <Menu onClick={onClick} selectedKeys={[current]} mode="inline" items={items} />;
};

export default ShopList;
