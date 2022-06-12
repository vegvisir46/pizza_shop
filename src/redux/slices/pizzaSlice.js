import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const {order, sortBy, searchBy, category, currentPage} = params;
    const {data} = await axios.get(`https://629add21cf163ceb8d1008f7.mockapi.io/items?page=${currentPage}&limit=4&${category}${searchBy}sortBy=${sortBy}&order=${order}`)
    console.log('fetch in slice', data);
    return data;
  }
);

const initialState = {
  items: [],
  status: 'loading',  // loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, {payload}) {
      state.items = payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizzaData = state => state.pizza;

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;