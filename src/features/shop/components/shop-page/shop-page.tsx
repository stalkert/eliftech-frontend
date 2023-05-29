import React, { useState } from 'react';
import ShopList from '../shop-list/shop-list';
import GoodList from '../good-list/good-list';
import PageLayout from '../../../../common/components/page-layout/page-layout';
import './shop-page.scss';
import { useAppSelector } from '../../../../store/store';
import { selectGoods } from '../../slice/good-list-slice';

const ShopPage: React.FC = () => {
  const [shopId, setShopId] = useState<number | null>(null);
  const goods = useAppSelector(selectGoods);

  const handleShopClick = (id: number) => {
    setShopId(id);
  };
  return (
    <PageLayout>
      <div className="shop-page__container">
        <div className="shop-page__sidebar">
          <div className="shop-page__shop-list">
            <ShopList onShopClick={handleShopClick} />
          </div>
        </div>
        <div className="shop-page__content">
          {shopId || goods.length ? (
            <GoodList shopId={shopId} />
          ) : (
            <p className="no-shop-selected">Please select a shop</p>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ShopPage;
