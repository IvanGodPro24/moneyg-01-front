import { Outlet } from "react-router-dom";

import Balance from "../Balance/Balance";
import Header from "../../components/Header/Header";
import Navigation from "../Navigation/Navigation";
import CurrencyTab from "../CurrencyTab/CurrencyTab";
import s from "./DashboardPage.module.css";

const DashboardPage = () => {
  return (
    <>
      <div className={s.background}></div>
      <Header />
      <main className={s.main}>
        <div className={s.container}>
          <div className={s.nav}>
            <Navigation />
            <Balance />
          </div>
          <CurrencyTab className={s.currency} />
        </div>
        <Outlet />
      </main>
    </>
  );
};

export default DashboardPage;
