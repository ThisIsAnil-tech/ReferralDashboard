import React, { Component } from 'react';
import styles from '../../styles/Dashboard.module.css';

class Pagination extends Component {
  render() {
    const { currentPage, totalItems, itemsPerPage, onPageChange } = this.props;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const from = ((currentPage - 1) * itemsPerPage) + 1;
    const to = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div className={styles.paginationWrapper}>
        <div className={styles.paginationInfo}>
          {`Showing ${from}–${to} of ${totalItems} entries`}
        </div>
        <div className={styles.paginationControls}>
          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`${styles.pageNumber} ${currentPage === (i + 1) ? styles.active : ''}`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    )
  }
}      

export default Pagination;