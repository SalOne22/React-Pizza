import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

import {
  FilterSliceState,
  selectFilter,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzasData } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searchValue, categoryId, currentPage, sortItem, sortOrder } =
    useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzasData);

  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((item: any) => (
    <PizzaBlock key={item.id} {...item} />
  ));

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        sortItem,
        searchValue,
        sortOrder,
        categoryId,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FilterSliceState;

      // const sortItem = listMenu.find((obj) => obj.sortTag === params.sortTag);

      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) getPizzas().then();
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
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению не удалось получить пиццы, попробуйте позже</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination />
    </div>
  );
};

export default Home;
