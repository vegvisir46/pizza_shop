import React, {FC} from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

type PaginationProps = {
  onChangePage: (page: number) => void;
  currentPage: number;
}

const Pagination: FC<PaginationProps> = ({onChangePage, currentPage}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={e => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      // renderOnZeroPageCount={null}
    />
  )
}

export default Pagination;