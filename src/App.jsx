import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./components/DashboardPage/DashboardPage";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegistrationPage />} />
      <Route
        path="/"
        element={
          <RestrictedRoute component={<LoginPage />} redirectTo="/dashboard" />
        }
      />
      <Route
        path="/dashboard"
        element={<PrivateRoute component={<DashboardPage />} />}
      ></Route>
      <Route
        path="/statistics"
        element={<PrivateRoute component={<StatisticsPage />} />}
      />
    </Routes>
  );
}

export default App;
