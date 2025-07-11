import css from "./EmptyTransaction.module.css";

const EmptyTransaction = () => {
  return (
    <div className={css.emptyState}>
      <div className={css.emptyStateIcon}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
            stroke="var(--icon-violet)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 9H18"
            stroke="var(--icon-violet)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 13H18"
            stroke="var(--icon-violet)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8 9H14"
            stroke="var(--yellow)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8 13H14"
            stroke="var(--yellow)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h3 className={css.emptyStateTitle}>No transactions yet</h3>
      <p className={css.emptyStateText}>
        Start by adding your first transaction
      </p>
    </div>
  );
};

export default EmptyTransaction;
