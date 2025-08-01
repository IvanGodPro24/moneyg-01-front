import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";
import Loader from "./components/Loader/Loader";
import { lazy, Suspense, useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
import { current } from "./redux/auth/operations.js";
import { selectIsRefreshing } from "./redux/auth/selectors.js";
import { Toaster } from "sonner";
import HomeTab from "./components/HomeTab/HomeTab";
import CurrencyTab from "./components/CurrencyTab/CurrencyTab";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import CheckEmail from "./components/CheckEmail/CheckEmail";
import GoogleRedirect from "./components/GoogleRedirect/GoogleRedirect";

const RegistrationPage = lazy(
  () => import("./pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const StatisticsPage = lazy(
  () => import("./pages/StatisticsPage/StatisticsPage")
);

function App() {
  const dispatch = useAppDispatch();
  const isRefreshing = useAppSelector(selectIsRefreshing);

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
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirm-google-auth" element={<GoogleRedirect />} />

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
