import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={css["login-page"]}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
