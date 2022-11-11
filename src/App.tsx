import './scss/app.scss';
import Loadable from 'react-loadable';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "cart" */ './pages/Cart'),
  loading: () => <div className="container">Загрузка...</div>,
});

const FullPizza = Loadable({
  loader: () => import(/* webpackChunkName: "fullPizza" */ './pages/FullPizza'),
  loading: () => <div className="container">Загрузка...</div>,
});

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "notFound" */ './pages/NotFound'),
  loading: () => <div className="container">Загрузка...</div>,
});

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
