import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort, { listMenu } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { setFilters } from '../redux/slices/filterSlice';

const itemsUrl = 'https://635a624f6f97ae73a62b0a80.mockapi.io/items';

const Home = ({ searchValue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, currentPage, sortItem, sortOrder } = useSelector(
    (state) => state.filter
  );

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items
    // .filter((obj) =>
    //   obj.title.toLowerCase().includes(searchValue.toLowerCase())
    // )
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  const fetchPizzas = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        `${itemsUrl}?sortBy=${sortItem.tag}${
          searchValue ? `&search=${searchValue}` : ''
        }&order=${sortOrder ? 'desc' : 'asc'}${
          categoryId && !searchValue ? `&category=${categoryId}` : ''
        }&page=${currentPage + 1}&limit=4`
      );
      setItems(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      // const sortItem = listMenu.find((obj) => obj.sortTag === params.sortTag);

      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;

    if (isMounted.current) {
      const queryString = qs.stringify({
        sortItem,
        sortOrder: Number(sortOrder),
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortItem, sortOrder, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination />
    </div>
  );
};

export default Home;
