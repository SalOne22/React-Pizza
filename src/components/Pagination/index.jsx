import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filter.currentPage);

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
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
