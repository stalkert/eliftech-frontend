import React, { useEffect, useState, useRef } from 'react';
import { GoodItem } from '../good-item/good-item';
import './good-list.scss';
import { useLazyGetGoodsQuery } from '../../api/repository';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import {
  addGoods,
  selectCurrentPage,
  selectCurrentShopId,
  selectGoods,
  selectIsLastGood,
  setCurrentPage,
  setCurrentShopId,
  setGoodsInitialState,
  setIsLastGood,
} from '../../slice/good-list-slice';
import { GoodListRequestParams } from '../../api/models/good.model';
import { throttle } from 'lodash';
import { selectCartGoods } from '../../../shopping-cart/slice/good-cart-list-slice';

interface GoodListProps {
  shopId: number | null;
}

const GoodList: React.FC<GoodListProps> = ({ shopId }) => {
  const limit = 4;
  const dispatch = useAppDispatch();

  const goods = useAppSelector(selectGoods);
  const currentShopId = useAppSelector(selectCurrentShopId);
  const currentPage = useAppSelector(selectCurrentPage);
  const isLastGood = useAppSelector(selectIsLastGood);
  const cartGoods = useAppSelector(selectCartGoods);
  const [page, setPage] = useState(currentPage);
  const [isLoading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggerGoodsFetching] = useLazyGetGoodsQuery();

  const fetchGoods = async (params: GoodListRequestParams) => {
    setLoading(true);
    const { data } = await triggerGoodsFetching(params, false);

    if (!data) {
      throw new Error('No data in query');
    }

    if (!data.length) {
      dispatch(setIsLastGood(true));
    }
    dispatch(addGoods(data));
    setLoading(false);
  };

  useEffect(() => {
    if (!cartGoods.length) {
      dispatch(setGoodsInitialState());
    }
  }, [cartGoods]);

  useEffect(() => {
    if (shopId) {
      dispatch(setGoodsInitialState());
      setPage(1);
      dispatch(setCurrentShopId(shopId));
    }
  }, [shopId]);

  useEffect(() => {
    if (!isLastGood) {
      if (shopId) {
        fetchGoods({ shopId, page, limit });
        dispatch(setCurrentPage(page));
      } else if (currentShopId && page !== currentPage) {
        fetchGoods({ shopId: currentShopId, page, limit });
        dispatch(setCurrentPage(page));
      }
    }
  }, [page, shopId]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        window.innerHeight + window.scrollY >= containerRef.current.offsetTop + containerRef.current.offsetHeight
      ) {
        setPage((page) => page + 1);
      }
    };
    const throttledScrollHandler = throttle(handleScroll, 200);
    window.addEventListener('scroll', throttledScrollHandler);
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, []);

  return (
    <div className="good-list" ref={containerRef}>
      {goods.map((good) => {
        return <GoodItem key={good.id} {...good} />;
      })}
      {isLoading && !goods.length && <div>Loading...</div>}
    </div>
  );
};

export default GoodList;
