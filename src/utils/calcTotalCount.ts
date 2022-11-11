import { CartItem } from '../redux/slices/types';

export const calcTotalCount = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.count + sum, 0);
};
