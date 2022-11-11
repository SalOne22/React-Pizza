import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { FilterSliceState, Pizza, PizzaSliceState, Status } from './types';

const itemsUrl = 'https://635a624f6f97ae73a62b0a80.mockapi.io/items';

export const fetchPizzas = createAsyncThunk<Pizza[], FilterSliceState>(
  'pizzas/fetchPizzasStatus',
  async (
    { sortItem, searchValue, sortOrder, categoryId, currentPage },
    thunkAPI
  ) => {
    const { data } = await axios.get<Pizza[]>(
      `${itemsUrl}?sortBy=${sortItem.tag}${
        searchValue ? `&search=${searchValue}` : ''
      }&order=${sortOrder ? 'desc' : 'asc'}${
        categoryId && !searchValue ? `&category=${categoryId}` : ''
      }&page=${currentPage + 1}&limit=4`
    );

    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Пицц нет');
    }

    return data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzasData = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
