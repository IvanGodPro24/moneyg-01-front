import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./RegistrationForm.css";
import { useDispatch } from "react-redux";
import { registered } from "../../redux/auth/operations";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
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

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ name, email, password }) => {
    try {
      dispatch(registered({ name, email, password }));

      navigate("/");
    } catch (err) {
      setError(err.message || "An error occurred during registration");
    }
  };

  return (
    <div className="registration-form">
      <div className="logo">
        <img src="/src/assets/logo.svg" alt="Money Guard" />
        <h1>Money Guard</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group-wrap">
          <div className="form-group">
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder="Name"
            />
            <svg className="input-icon">
              <use href="/src/img/icons.svg#icon-user" />
            </svg>
            {errors.name && (
              <span className="error">{errors.name.message}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="E-mail"
            />
            <svg className="input-icon">
              <use href="/src/img/icons.svg#icon-email" />
            </svg>
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              id="newPassword"
              {...register("newPassword")}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <svg className="input-icon">
              <use href="/src/img/icons.svg#icon-lock" />
            </svg>
            {errors.newPassword && (
              <span className="error">{errors.newPassword.message}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Confirm password"
            />
            <svg className="input-icon">
              <use href="/src/img/icons.svg#icon-lock" />
            </svg>
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
            <div className="custom-strength-bar">
              <div
                className="strength-progress"
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
        <button type="submit" className="submit-button">
          REGISTER
        </button>
        <Link to="/login" className="redirect-button">
          LOG IN
        </Link>
      </form>
    </div>
  );
};

export default RegistrationForm;
