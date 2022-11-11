import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

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

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 0,
  sortItem: {
    title: SortTitle.RATING,
    tag: SortTag.RATING,
  },
  sortOrder: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortOrder(state, action: PayloadAction<number>) {
      state.sortOrder = action.payload;
    },
    setSortItem(state, action: PayloadAction<SortItem>) {
      state.sortItem = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sortOrder = Number(action.payload.sortOrder);
      state.categoryId = Number(action.payload.categoryId);
      state.sortItem = Object(action.payload.sortItem);
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const {
  setSearchValue,
  setCategoryId,
  setSortItem,
  setSortOrder,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
