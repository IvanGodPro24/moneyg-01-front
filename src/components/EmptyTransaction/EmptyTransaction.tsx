import css from "./EmptyTransaction.module.css";
import icons from "../../img/icons.svg";
import { EmptyTransactionProps } from "./EmptyTransaction.types";

const EmptyTransaction = ({ filter = false }: EmptyTransactionProps) => {
  return (
    <div className={css.empty}>
      <div className={css.emptyIcon}>
        {filter ? (
          <svg width="48" height="48">
            <use href={`${icons}#icon-filter`} />
          </svg>
        ) : (
          <svg width="48" height="48">
            <use href={`${icons}#icon-empty`} />
          </svg>
        )}
      </div>

      <h3 className={css.emptyTitle}>
        {filter ? "No transactions found " : "No transactions yet"}
      </h3>

      <p className={css.emptyText}>
        {filter
          ? "Try adjusting your filters to find what you're looking for"
          : "Start by adding your first transaction"}
      </p>
    </div>
  );
};

export default EmptyTransaction;
