import ShopPage from '../features/shop/components/shop-page/shop-page';
import ShoppingCartPage from '../features/shopping-cart/components/shopping-cart-page/shopping-cart-page';

interface RouteItem {
  path: string;
  element: any;
}

export const routes: Record<string, RouteItem> = {
  shopPage: {
    path: '/',
    element: <ShopPage />,
  },
  shoppingCartPage: {
    path: '/shopping-cart',
    element: <ShoppingCartPage />,
  },
};
