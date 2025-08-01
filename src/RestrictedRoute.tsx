import { useAppSelector } from "./hooks/useAppSelector";
import { selectIsLoggedIn } from "./redux/auth/selectors";
import { Navigate } from "react-router-dom";
import { RouteProps } from "./Route.types";

const RestrictedRoute = ({
  component: Component,
  redirectTo = "/",
}: RouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
