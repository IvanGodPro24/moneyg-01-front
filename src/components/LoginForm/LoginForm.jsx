import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useState } from "react";
import css from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }) => {
    try {
      dispatch(login({ email, password }));
    } catch (err) {
      setError(err.message || "An error occurred during login");
    }
  };

  return (
    <div className={css["login-form"]}>
      <div className={css.logo}>
        <img src="/src/assets/logo.svg" alt="Money Guard" />
        <h1>Money Guard</h1>
      </div>

      {error && <div className={css["error-message"]}>{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css["form-group-wrap"]}>
          <div className={css["form-group"]}>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="E-mail"
            />
            <svg className={css["input-icon"]}>
              <use href="/src/img/icons.svg#icon-email" />
            </svg>
            {errors.email && (
              <span className={css.error}>{errors.email.message}</span>
            )}
          </div>
          <div className={css["form-group"]}>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Password"
            />
            <svg className={css["input-icon"]}>
              <use href="/src/img/icons.svg#icon-lock" />
            </svg>
            {errors.password && (
              <span className={css.error}>{errors.password.message}</span>
            )}
          </div>
        </div>
        <button type="submit" className={css["submit-button"]}>
          LOG IN
        </button>
        <Link to="/register" className={css["redirect-button"]}>
          REGISTER
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
