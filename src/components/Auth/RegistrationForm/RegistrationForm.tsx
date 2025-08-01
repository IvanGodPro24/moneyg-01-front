import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import css from "../Auth.module.css";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { registered } from "../../../redux/auth/operations";
import clsx from "clsx";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { RegisterCredentials, RegisterSchema } from "../../../redux/auth/auth.types";

const schema: yup.ObjectSchema<RegisterSchema> = yup.object().shape({
  name: yup
    .string()
    .max(30, "Name must be at most 30 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters")
    .required("Password is required"),
  password: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Password confirmation is required"),
});

const RegistrationForm = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShow = () => setShowPassword((prev) => !prev);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ name, email, password }: RegisterCredentials) => {
    setLoading(true);
    try {
      await dispatch(registered({ name, email, password })).unwrap();

      navigate("/");
    } catch (err: any) {
      setError(err || "An error occurred during registration");
    } finally {
      setLoading(false);
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
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder="Name"
            />
            <svg className={css["input-icon"]}>
              <use href="/src/img/icons.svg#icon-user" />
            </svg>
            {errors.name && (
              <span className="errorText">{errors.name.message}</span>
            )}
          </div>
          <div className={clsx(css["form-group"], "relative")}>
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
              <span className="errorText">{errors.email.message}</span>
            )}
          </div>
          <div className={clsx(css["form-group"], "relative")}>
            <svg className={css["input-icon"]}>
              <use href="/src/img/icons.svg#icon-lock" />
            </svg>

            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              {...register("newPassword")}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <button type="button" className={css.eye} onClick={toggleShow}>
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>

            {errors.newPassword && (
              <span className="errorText">{errors.newPassword.message}</span>
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
              placeholder="Confirm password"
            />

            <button type="button" className={css.eye} onClick={toggleShow}>
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>

            {errors.password && (
              <span className="errorText">{errors.password.message}</span>
            )}

            <div className={css["custom-strength-bar"]}>
              <div
                className={clsx(css["strength-progress"], "relative")}
                style={{ width: `${passwordStrength * 25}%` }}
              ></div>
            </div>
            <PasswordStrengthBar
              password={password}
              onChangeScore={(score) => {
                setPasswordStrength(score);
              }}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className={css["btn-container"]}>
          {loading ? (
            <ClipLoader size={50} color="#3498db" />
          ) : (
            <button type="submit" className={css["submit-button"]}>
              REGISTER
            </button>
          )}

          <Link to="/login" className={css["redirect-button"]}>
            LOG IN
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
