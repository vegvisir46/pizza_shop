import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './scss/app.scss';

import Header from './Components/Header';
import Categories from './Components/Categories';
import Sort from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';


function App() {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    fetch('https://629add21cf163ceb8d1008f7.mockapi.io/items')
      .then(response => response.json())
      .then(data => setPizzas(data))
  }, [])

  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories/>
            <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((item, i) => {
              return <PizzaBlock {...item} key={i}/>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
