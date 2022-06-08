import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  currentPage: 1,
  currentSort: {
    name: 'популярности (убыв.)',
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
    setCategoryId(state, {payload}) {
      state.categoryId = payload;
    },
    setSort(state, {payload}) {
      state.currentSort = payload;
      // state.currentSort = {...state.currentSort, ...payload}
    },
    setCurrentPage(state, {payload}) {
      state.currentPage = payload;
    },
    setFilters(state, {payload}) {
      state.currentPage = Number(payload.currentPage);
      state.currentSort = payload.sort;
      state.categoryId = Number(payload.categoryId);
    }
  },
});

export const {setCategoryId, setSort, setCurrentPage, setFilters} = filterSlice.actions;

export default filterSlice.reducer;