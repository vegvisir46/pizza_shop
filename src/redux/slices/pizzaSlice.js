import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, {payload}) {
      state.items = payload;
    },
  }
});

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;