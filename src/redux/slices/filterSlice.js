import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId : 0,
  currentSort: {
    name: 'популярности(убыв.)',
    sortProperty: 'rating'
  },
  sorts: [
    {name: 'популярности (убыв.)', sortProperty: 'rating'},
    {name: 'популярности (возр.)', sortProperty: '-rating'},
    {name: 'цене (убыв.)', sortProperty: 'price'},
    {name: 'цене (возр.)', sortProperty: '-price'},
    {name: 'алфавиту (убыв.)', sortProperty: 'title'},
    {name: 'алфавиту (возр.)', sortProperty: '-title'}
  ]
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId (state, {payload}) {
      state.categoryId = payload;
    },
    setSort (state, action) {
      state.currentSort = action.payload
      // state.currentSort = {...state.currentSort, ...payload}
    }
  },
});

export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;