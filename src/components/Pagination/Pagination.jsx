import clsx from "clsx";
import css from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
}) => {
  const handlePrev = () => {
    if (hasPreviousPage) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (hasNextPage) onPageChange(currentPage + 1);
  };

  const getPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className={css.pagination}>
      <button
        className={css.btn}
        onClick={handlePrev}
        disabled={!hasPreviousPage}
      >
        Prev
      </button>

      <div className={css.pageNumbers}>
        {getPages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={clsx(css.btn, currentPage === page && css.active)}
          >
            {page}
          </button>
        ))}
      </div>

      <button className={css.btn} onClick={handleNext} disabled={!hasNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
