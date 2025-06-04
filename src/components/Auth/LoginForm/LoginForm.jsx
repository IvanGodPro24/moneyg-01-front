import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useState } from "react";
import css from "../Auth.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/auth/operations";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import clsx from "clsx";

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
  const [showPassword, setShowPassword] = useState(false);

  const toggleShow = () => setShowPassword((prev) => !prev);

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
      await dispatch(login({ email, password })).unwrap();
    } catch (err) {
      setError(err || "An error occurred during login");
    }
  };

  return (
    <div className={css.form}>
      <div className={css.logo}>
        <img src="/logo.svg" alt="Money Guard" />
        <h1>Money Guard</h1>
      </div>

      {error && <div className={css["error-message"]}>{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css["form-group-wrap"]}>
          <div className={clsx(css["form-group"], "relative")}>
            <svg className={css["input-icon"]}>
              <use href="/src/img/icons.svg#icon-email" />
            </svg>

            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="E-mail"
            />

            {errors.email && (
              <span className="errorText">{errors.email.message}</span>
            )}
          </div>

          <div className={clsx(css["form-group"], "relative")}>
            <svg className={css["input-icon"]}>
              <use href="/src/img/icons.svg#icon-lock" />
            </svg>

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              placeholder="Password"
            />

            <button type="button" className={css.eye} onClick={toggleShow}>
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>

            {errors.password && (
              <span className="errorText">{errors.password.message}</span>
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
