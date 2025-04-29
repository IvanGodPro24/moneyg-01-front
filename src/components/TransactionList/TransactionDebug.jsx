import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transactions/selectors";

const TransactionDebug = () => {
  const transactions = useSelector(selectTransactions);

  console.log("Current transactions:", transactions);

  const categoryFormats = transactions.map((t) => ({
    id: t._id,
    categoryType: typeof t.categoryId,
    categoryValue: t.categoryId,
    hasTitle: t.categoryId && t.categoryId.title ? true : false,
  }));

  console.log("Category formats:", categoryFormats);

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", margin: "20px 0" }}
    >
      <h3>Транзакции и их категории (отладка)</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(transactions, null, 2)}
      </pre>
    </div>
  );
};

export default TransactionDebug;
