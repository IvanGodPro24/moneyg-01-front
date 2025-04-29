import { Link } from "react-router-dom";
import TransactionModalWrapper from "../TransactionModalWrapper/TransactionModalWrapper";

const DashboardPage = () => {
  return (
    <>
      <div>DashboardPage</div>
      <TransactionModalWrapper />
      <Link to="/statistics">Statistics</Link>
    </>
  );
};

export default DashboardPage;
