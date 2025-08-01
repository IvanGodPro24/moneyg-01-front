import { TransactionType } from "../redux/transactions/transactions.types";

export const copyTransactionToClipboard = (transaction: TransactionType) => {
  const { date, category, comment, sum, type } = transaction;

  const formatted = `
  Transaction:
  📅 Date: ${date}
  🔁 Type: ${type === "income" ? "+" : "-"}
  📂 Category: ${category}
  💬 Comment: ${comment || "-"}
  💰 Sum: ${sum && sum.toFixed(2)}
    `.trim();

  return navigator.clipboard.writeText(formatted);
};
