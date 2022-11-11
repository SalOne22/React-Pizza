import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FC } from 'react';
import { RootState } from '../../redux/store';

const Pagination: FC = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.filter.currentPage
  );

  return (
    <ReactPaginate
      className={styles.root}
      pageCount={3}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      forcePage={currentPage}
      onPageChange={(event) => dispatch(setCurrentPage(event.selected))}
      pageRangeDisplayed={4}
    />
  );
};

export default Pagination;
