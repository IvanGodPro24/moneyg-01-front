import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./RegistrationForm.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

const RegistrationForm = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);
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
              id="password"
              {...register("password")}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <svg className="input-icon">
              <use href="/src/img/icons.svg#icon-lock" />
            </svg>
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              placeholder="Confirm password"
            />
            <svg className="input-icon">
              <use href="/src/img/icons.svg#icon-lock" />
            </svg>
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword.message}</span>
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
