import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.css';

const Pagination = ({totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalItems / itemsPerPage));
  const pageNumbersToShow = 5; // Number of page numbers to show before and after the current page

  useEffect(() =>
  {
    console.log("Pagination component " + totalItems)
    setTotalPages(Math.ceil(totalItems / itemsPerPage))
  }, [totalItems])

  const goToPage = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = Math.min(prevPage + 1, totalPages);
      onPageChange(nextPage);
      return nextPage;
    });
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => {
      const prevPageNumber = Math.max(prevPage - 1, 1);
      onPageChange(prevPageNumber);
      return prevPageNumber;
    });
  };

  const renderPageNumbers = () => {
    let startPage = Math.max(currentPage - Math.floor(pageNumbersToShow / 2), 1);
    let endPage = Math.min(startPage + pageNumbersToShow - 1, totalPages);
  
    // Adjust startPage and endPage if there are fewer pages than pageNumbersToShow
    if (totalPages <= pageNumbersToShow) {
      startPage = 1;
      endPage = totalPages;
    } else if (endPage === totalPages) {
      startPage = totalPages - pageNumbersToShow + 1;
    }
  
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={currentPage === i ? (styles.selected_pageNumber) : (styles.unselected_pageNumber)} 
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  

  return (
    <div className={styles.pagination}>
      <button className={styles.prevPage_btn} onClick={prevPage} disabled={currentPage === 1}>
        &lt;
      </button>
          {currentPage > 1 + pageNumbersToShow && <button className={currentPage === 1 ? (styles.selected_pageNumber) : (styles.unselected_pageNumber)}  onClick={() => goToPage(1)}>1</button>}
          {currentPage > 2 + pageNumbersToShow && <span className={styles.three_dots}>...</span>}
          {renderPageNumbers()}
          {currentPage < totalPages - (pageNumbersToShow + 1) && <span className={styles.three_dots}>...</span>}
          {currentPage < totalPages - pageNumbersToShow && <button className={currentPage === totalPages ? (styles.selected_pageNumber) : (styles.unselected_pageNumber)}  onClick={() => goToPage(totalPages)}>{totalPages}</button>}
      <button className={styles.nextPage_btn} onClick={nextPage} disabled={currentPage === totalPages}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;