import React, {FC, useEffect, useRef} from "react";
import qs from 'qs';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import Skeleton from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock";
import Pagination from "../Components/Pagination";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzaSlice";

const Home: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFilterUrl = useRef(false);
  const isMounted = useRef(false);

  const {items, status} = useSelector(selectPizzaData);
  const {categoryId, currentSort, currentPage, sorts, searchValue} = useSelector(selectFilter);
  const sortProperty = currentSort.sortProperty;

  const onChangeCategory = (i: number) => {
    dispatch(setCategoryId(i));
  }

  const getPizzas = async () => {
    const order = sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}&` : ``;
    const searchBy = searchValue ? `search=${searchValue}&` : ``;
    dispatch(
      // @ts-ignore
      fetchPizzas({order, sortBy, searchBy, category, currentPage}));
  };

  //update URL if !1st render
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({sortProperty, categoryId, currentPage});
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortProperty, currentPage]);

  //check URL for filters during 1st render and save to redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sorts.find((obj: any) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({...params, sort}));
      isFilterUrl.current = true;
    }
  }, []);

  //fetch
  useEffect(() => {
    if (!isFilterUrl.current) {
      getPizzas();
      window.scrollTo(0, 0);
    }
    isFilterUrl.current = false;
  }, [categoryId, sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: any, i: number) => <PizzaBlock {...obj} key={i}/>);
  const skeletons = [...new Array(4)].map((s, i) => <Skeleton key={i}/>);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить список пицц.<br/>Пожалуйста, попробуйте позже.</p>
        </div> : <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      }

      <Pagination onChangePage={(page: number) => dispatch(setCurrentPage(page))}
                  currentPage={currentPage}/>
    </div>
  )
}

export default Home;