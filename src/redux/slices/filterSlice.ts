import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

export type TSort = {
  name: string;
  sortProperty: SortPropertyEnum;
}

export interface IInitialState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  currentSort: TSort;
  // sorts: { name: string, sortProperty: string }[]
}

const initialState: IInitialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  currentSort: {
    name: 'популярности (убыв.)',
    sortProperty: SortPropertyEnum.RATING_DESC
  },
  // sorts: [
  //   {name: 'популярности (убыв.)', sortProperty: 'rating'},
  //   {name: 'популярности (возр.)', sortProperty: '-rating'},
  //   {name: 'цене (убыв.)', sortProperty: 'price'},
  //   {name: 'цене (возр.)', sortProperty: '-price'},
  //   {name: 'алфавиту (убыв.)', sortProperty: 'title'},
  //   {name: 'алфавиту (возр.)', sortProperty: '-title'}
  // ]
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.currentSort = action.payload;
      // state.currentSort = {...state.currentSort, ...payload}
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IInitialState>) {
      const {payload} = action;
      state.currentPage = Number(payload.currentPage);
      state.currentSort = payload.currentSort;
      state.categoryId = Number(payload.categoryId);
    }
  }
});

export const selectFilter = (state: RootState) => state.filter;
// export const selectSorts = (state: RootState) => state.filter.sorts;
export const selectCurrentSort = (state: RootState) => state.filter.currentSort;
export const selectCategoryId = (state: RootState) => state.filter.categoryId;

export const {setCategoryId, setSearchValue, setSort, setCurrentPage, setFilters} = filterSlice.actions;

export default filterSlice.reducer;