import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import css from "../Auth/Auth.module.css";
import s from "../../pages/LoginPage/LoginPage.module.css";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { requestResetEmail } from "../../redux/auth/operations";
import { useState } from "react";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email }) => {
    setLoading(true);
    try {
      await dispatch(requestResetEmail(email)).unwrap();
      toast.success("Password reset email sent!");
      navigate("/check-email");
    } catch (err) {
      setError(err || "Failed to send reset email");
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
          </div>

          {loading ? (
            <ClipLoader size={50} color="#3498db" />
          ) : (
            <button type="submit" className={css["submit-button"]}>
              reset
            </button>
          )}
          <Link to="/login" className={css["redirect-button"]}>
            go back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
