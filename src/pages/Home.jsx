import React, {useEffect, useRef, useState} from "react";
import qs from 'qs';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import {SearchContext} from "../App";
import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import Skeleton from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock";
import Pagination from "../Components/Pagination";
import {setCurrentPage, setFilters} from "../redux/slices/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFilterUrl = useRef(false);
  const isMounted = useRef(false);

  const {searchValue} = React.useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {categoryId, currentSort, currentPage, sorts} = useSelector((state) => state.filter);
  const sortProperty = currentSort.sortProperty;

  const fetchPizzas = () => {
    setIsLoading(true);
    const order = sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}&` : ``;
    const searchBy = searchValue ? `search=${searchValue}&` : ``;
    axios.get(`https://629add21cf163ceb8d1008f7.mockapi.io/items?page=${currentPage}&limit=4&${category}${searchBy}sortBy=${sortBy}&order=${order}`)
      .then(res => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  }

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
      const sort = sorts.find(obj => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({...params, sort}));
      isFilterUrl.current = true;
    }
  }, []);

  //fetch
  useEffect(() => {
    if (!isFilterUrl.current) {
      fetchPizzas();
      window.scrollTo(0, 0);
    }
    isFilterUrl.current = false;
  }, [categoryId, sortProperty, searchValue, currentPage]);

  const items = pizzas.map((obj, i) => <PizzaBlock {...obj} key={i}/>);
  const skeletons = [...new Array(4)].map((s, i) => <Skeleton key={i}/>);

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : items}
      </div>
      <Pagination onChangePage={number => dispatch(setCurrentPage(number))}
                  currentPage={currentPage}/>
    </div>
  )
}

export default Home;