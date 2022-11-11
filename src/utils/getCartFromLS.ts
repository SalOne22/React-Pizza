import { calcTotalPrice } from './calcTotalPrice';
import { calcTotalCount } from './calcTotalCount';
import { CartItem } from '../redux/slices/types';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? (JSON.parse(data) as CartItem[]) : [];
  const totalPrice = calcTotalPrice(items);
  const totalCount = calcTotalCount(items);

  return {
    totalPrice,
    totalCount,
    items,
  };
};
