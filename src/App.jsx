import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";
import Loader from "./components/Loader/Loader";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { current } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { Toaster } from "sonner";
import HomeTab from "./components/HomeTab/HomeTab";
import CurrencyTab from "./components/CurrencyTab/CurrencyTab";

const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const DashboardPage = lazy(() =>
  import("./components/DashboardPage/DashboardPage")
);
const StatisticsPage = lazy(() =>
  import("./pages/StatisticsPage/StatisticsPage")
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Toaster expand position="top-center"></Toaster>

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/dashboard"
              />
            }
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={<DashboardPage />} />}
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomeTab />} />
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path="currency" element={<CurrencyTab />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
