import LoginForm from "../../components/Auth/LoginForm/LoginForm";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <>
      <title>Login</title>

      <div className={css.page}>
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
