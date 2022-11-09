import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const itemsUrl = 'https://635a624f6f97ae73a62b0a80.mockapi.io/items';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { sortItem, searchValue, sortOrder, categoryId, currentPage } =
      params;

    const { data } = await axios.get(
      `${itemsUrl}?sortBy=${sortItem.tag}${
        searchValue ? `&search=${searchValue}` : ''
      }&order=${sortOrder ? 'desc' : 'asc'}${
        categoryId && !searchValue ? `&category=${categoryId}` : ''
      }&page=${currentPage + 1}&limit=4`
    );

    console.log(thunkAPI);

    return data;
  }
);

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
