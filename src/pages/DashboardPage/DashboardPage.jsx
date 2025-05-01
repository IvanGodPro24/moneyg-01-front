import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useDevice from "../../hooks/useDevice";

import Balance from "../../components/Balance/Balance";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import CurrencyTab from "../../components/CurrencyTab/CurrencyTab";
import s from "./DashboardPage.module.css";

const DashboardPage = () => {
  const { isTablet, isDesktop } = useDevice();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isTablet && location.pathname === "/dashboard/currency") {
      navigate("/dashboard/home");
    }
  }, [isTablet, location.pathname, navigate]);

  return (
    <>
      <div className={s.background}></div>
      <Header />
      <main className={s.main}>
        <div className={s.container}>
          <div className={s.nav}>
            <Navigation />
            {(isTablet ||
              isDesktop ||
              location.pathname === "/dashboard/home") && <Balance />}{" "}
          </div>
          {(isTablet || isDesktop) && <CurrencyTab />}
        </div>
        <div className={s.right}>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
