import clsx from "clsx";
import css from "./Pagination.module.css";
import OptionSelect from "../OptionSelect/OptionSelect";
import { perPageOptions } from "../../constants/constants";
import { PaginationProps } from "./Pagination.types";
import { SingleValue } from "react-select";
import { NumberOptions } from "../../constants/constants.types";

const Pagination = ({
  currentPage,
  perPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
  onPerPageChange,
}: PaginationProps) => {
  const handlePrev = () => {
    if (hasPreviousPage && currentPage) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (hasNextPage && currentPage) onPageChange(currentPage + 1);
  };

  const getPages = () => {
    const pages = [];

    if (totalPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const onChange = (selectedOption: SingleValue<NumberOptions> | null) => {
    onPerPageChange(selectedOption);
  };

  return (
    <div className={css.container}>
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

        <button
          className={css.btn}
          onClick={handleNext}
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>

      <OptionSelect<NumberOptions>
        name="per-page"
        options={perPageOptions}
        value={perPageOptions.find((opt) => opt.value === perPage)}
        onChange={onChange}
        placeholder="Items per page"
      />
    </div>
  );
};

export default Pagination;
