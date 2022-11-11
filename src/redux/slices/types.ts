export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  count: number;
  type: 'Тонкое' | 'Традиционное';
  size: number;
};

export interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: CartItem[];
}

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

export enum SortTitle {
  RATING = 'популярности',
  PRICE = 'цене',
  TITLE = 'алфавиту',
}
export enum SortTag {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export type SortItem = {
  title: SortTitle;
  tag: SortTag;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortItem: SortItem;
  sortOrder: number;
}
