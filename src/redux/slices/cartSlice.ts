import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export type TCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

export type TCartItemToChange = {
  id: string;
  type: string;
  size: number;
}

interface IInitialState {
  totalPrice: number;
  items: TCartItem[]
}

const initialState: IInitialState = {
  totalPrice: 0,
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const {payload} = action;
      const findItem = state.items.find(obj => {
        return ((obj.id === payload.id) &&
          (obj.size === payload.size) &&
          (obj.type === payload.type))
      });
      findItem ? findItem.count++ : state.items.push({
        ...payload, count: 1
      });
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem(state, action: PayloadAction<TCartItemToChange>) {
      const {payload} = action;
      const findItem = state.items.find(obj => {
        return ((obj.id === payload.id) &&
          (obj.size === payload.size) &&
          (obj.type === payload.type))
      });
      if (findItem) {
        findItem.count--;
        (state.totalPrice -= findItem.price)
      }
    },

    removeItem(state, action: PayloadAction<TCartItemToChange>) {
      const {payload} = action;
      const findItem = state.items.find(obj => {
        return ((obj.id === payload.id) &&
          (obj.size === payload.size) &&
          (obj.type === payload.type))
      });
      findItem && (state.totalPrice -= findItem.price * findItem.count);
      state.items = state.items.filter(obj => {
        return ((obj.id !== payload.id) ||
          (obj.size !== payload.size) ||
          (obj.type !== payload.type))
      });
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  }
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id);

export const {addItem, minusItem, removeItem, clearItems} = cartSlice.actions;

export default cartSlice.reducer;