import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 0,
  sortItem: {
    title: 'популярности',
    tag: 'rating',
  },
  sortOrder: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
    setSortItem(state, action) {
      state.sortItem = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sortOrder = Number(action.payload.sortOrder);
      state.categoryId = Number(action.payload.categoryId);
      state.sortItem = Object(action.payload.sortItem);
    },
  },
});

export const {
  setCategoryId,
  setSortItem,
  setSortOrder,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
