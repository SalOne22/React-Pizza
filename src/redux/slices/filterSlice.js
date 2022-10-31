import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
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
  },
});

export const { setCategoryId, setSortItem, setSortOrder } = filterSlice.actions;

export default filterSlice.reducer;
