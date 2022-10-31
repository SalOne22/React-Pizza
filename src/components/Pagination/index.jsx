import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ setCurrentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      pageCount={3}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => setCurrentPage(event.selected + 1)}
      pageRangeDisplayed={4}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
