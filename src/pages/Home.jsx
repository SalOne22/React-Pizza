import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';

const itemsUrl = 'https://635a624f6f97ae73a62b0a80.mockapi.io/items';

const Home = ({ searchValue }) => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortItem = useSelector((state) => state.filter.sortItem);
  const sortOrder = useSelector((state) => state.filter.sortOrder);

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items
    // .filter((obj) =>
    //   obj.title.toLowerCase().includes(searchValue.toLowerCase())
    // )
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${itemsUrl}?sortBy=${sortItem.tag}${
        searchValue ? `&search=${searchValue}` : ''
      }&order=${sortOrder ? 'desc' : 'asc'}${
        categoryId && !searchValue ? `&category=${categoryId}` : ''
      }&page=${currentPage}&limit=4`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortItem, sortOrder, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
