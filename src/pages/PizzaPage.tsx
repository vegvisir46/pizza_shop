import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

const PizzaPage: FC = () => {
  const {id} = useParams();
  const [pizzaData, setPizzaData] = useState<{
    imageUrl: string, title: string, price: number, description: string
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get(`https://629add21cf163ceb8d1008f7.mockapi.io/items/` + id);
        setPizzaData(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/')
      }
    }

    fetchPizza();
  }, []);

  if (!pizzaData) {
    return <div className="container">
      <h2>Загрузка сочной питсы...</h2>
    </div>
  }
  return (
    <div className="container">
      <img src={pizzaData.imageUrl} alt=""/>
      <h2>{pizzaData.title}</h2>
      <p>{pizzaData.description}</p>
      <h4>{pizzaData.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default PizzaPage;