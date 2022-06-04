import React, {useEffect, useState} from "react";

import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import Skeleton from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({name: 'популярности', sortProperty: 'rating'});
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}&` : ``;
    fetch(`https://629add21cf163ceb8d1008f7.mockapi.io/items?${category}sortBy=${sortBy}&order=${order}`)
      .then(res => res.json())
      .then(data => {
        setPizzas(data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortOrder]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId}
                    onChangeCategory={(i) => setCategoryId(i)}/>
        <Sort value={sortType}
              onChangeSort={(i) => setSortType(i)}
              sortOrder={sortOrder}
              setSortOrder={(i) => setSortOrder(i)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(10)].map((s, i) => <Skeleton key={i}/>) :
          pizzas.map((item, i) => <PizzaBlock {...item} key={i}/>)
        }

      </div>
    </div>
  )
}

export default Home;