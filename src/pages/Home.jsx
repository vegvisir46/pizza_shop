import React, {useEffect, useState} from "react";

import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import Skeleton from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://629add21cf163ceb8d1008f7.mockapi.io/items')
      .then(res => res.json())
      .then(data => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
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