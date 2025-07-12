import css from "./TransactionFilter.module.css";

const TransactionFilter = () => {
  return (
    <OptionSelect
      name="per-page"
      options={perPageOptions}
      value={perPageOptions.find((opt) => opt.value === perPage)}
      onChange={onChange}
      placeholder="Items per page"
    />
  );
};

export default TransactionFilter;
