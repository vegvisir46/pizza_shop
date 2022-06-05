import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId : 0,
  sort: {
    name: 'популярности(убыв.)',
    sortProperty: 'rating'
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId (state, {payload}) {
      state.categoryId = payload;
    },
    setSort (state, {payload}) {
      state.sort = {...state.sort, ...payload}
    }
  },
});

export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;