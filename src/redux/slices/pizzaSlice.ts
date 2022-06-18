import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {TSort} from "./filterSlice";

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type TPizzaItem = {
  id: string; title: string; price: number; imageUrl: string;
  sizes: number[]; types: number[]; rating: number;
};

interface IInitialState {
  items: TPizzaItem[];
  status: Status;
}

const initialState: IInitialState = {
  items: [],
  status: Status.LOADING
};

export type SearchPizzaParams = {
  order: string; sortBy: string; searchBy: string; category: string; currentPage: string;
}

export const fetchPizzas = createAsyncThunk<TPizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const {order, sortBy, searchBy, category, currentPage} = params;
    const {data} = await axios.get<TPizzaItem[]>(`https://629add21cf163ceb8d1008f7.mockapi.io/items?page=${currentPage}&limit=4&${category}${searchBy}sortBy=${sortBy}&order=${order}`)
    console.log('fetch in slice', data);
    return data;
  }
);

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizzaItem[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    })

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  }

  // __without TS__
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.status = 'success';
  //     state.items = action.payload;
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;