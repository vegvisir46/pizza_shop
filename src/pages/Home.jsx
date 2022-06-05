import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setCategoryId, setSort} from "../redux/slices/filterSlice";
import {SearchContext} from "../App";
import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import Skeleton from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock";
import Pagination from "../Components/Pagination";

const Home = () => {
  const {searchValue} = React.useContext(SearchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sort = useSelector(state => state.filter.sort);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}&` : ``;
    const searchBy = searchValue ? `search=${searchValue}&` : ``;
    fetch(`https://629add21cf163ceb8d1008f7.mockapi.io/items?page=${currentPage}&limit=4&${category}${searchBy}sortBy=${sortBy}&order=${order}`)
      .then(res => res.json())
      .then(data => {
        setPizzas(data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);


  const items = pizzas.map((obj, i) => <PizzaBlock {...obj} key={i}/>);
  const skeletons = [...new Array(4)].map((s, i) => <Skeleton key={i}/>);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId}
                    onChangeCategory={(i) => dispatch(setCategoryId(i))}/>
        <Sort value={sort}
              onChangeSort={(i) => dispatch(setSort(i))}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : items}
      </div>
      <Pagination onChangePage={number => setCurrentPage(number)}/>
    </div>
  )
}

export default Home;