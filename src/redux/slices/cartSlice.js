import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
      // state.totalPrice += payload.price;
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price + sum;
      }, 0);
    },
    removeItem(state, {payload}) {
      state.items = state.items.filter(obj => obj.id !== payload);
    },
    clearItems(state) {
      state.items = [];
    },
  }
});

export const {addItem, removeItem, clearItems} = cartSlice.actions;

export default cartSlice.reducer;