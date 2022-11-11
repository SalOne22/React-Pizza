import { useNavigate, useParams } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://635a624f6f97ae73a62b0a80.mockapi.io/items/' + id
        );
        setPizza(data);
      } catch (e) {
        alert('Произошла ошибка, повторите позже');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
