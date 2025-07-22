import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import css from "../Auth/Auth.module.css";
import s from "../../pages/LoginPage/LoginPage.module.css";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import PasswordStrengthBar from "react-password-strength-bar";
import { resetPassword } from "../../redux/auth/operations";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

const schema = yup.object().shape({
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

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const toggleShow = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ password }) => {
    setLoading(true);
    try {
      await dispatch(resetPassword({ token, password })).unwrap();

      toast.success("Password successfully reset!");
      navigate("/login");
    } catch (err) {
      setError(err || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.page}>
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

          {loading ? (
            <ClipLoader size={50} color="#3498db" />
          ) : (
            <button type="submit" className={css["submit-button"]}>
              change
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
