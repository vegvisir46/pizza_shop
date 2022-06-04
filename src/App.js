import React from 'react';
import logo from './logo.svg';
import './scss/app.scss';

import Header from './Components/Header';
import Categories from './Components/Categories';
import Sort from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';
import pizzas from './assets/pizzas.json';

function App() {
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


            {/*<PizzaBlock title={'Мексиканская'} price={'500'}/>*/}
            {/*<PizzaBlock title={'Мексиканская'} price={'500'}/>*/}
            {/*<PizzaBlock title={'Мексиканская'} price={'500'}/>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
