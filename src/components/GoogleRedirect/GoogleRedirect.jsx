import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginWithGoogle } from "../../redux/auth/operations";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import css from "./GoogleRedirect.module.css";
import icons from "../../img/icons.svg";
import { toast } from "sonner";

const GoogleRedirect = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      try {
        await dispatch(loginWithGoogle(code)).unwrap();

        navigate("/dashboard");
      } catch (error) {
        toast.error(`Google login failed: ${error}`);
        console.error("Google login failed:", error);

        navigate("/");
      }
    };

    login();
  }, [code, dispatch, navigate]);

  return (
    <motion.div
      className={css.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={css.card}>
        <div className={css.logoAnimation}>
          <div className={css.googleLogo}>
            <svg width="60" height="60" className={css.googleIcon}>
              <use href={`${icons}#icon-google`}></use>
            </svg>
          </div>
        </div>

        <h1 className={css.title}>Signing in with Google</h1>
        <p className={css.text}>
          Please wait while we authenticate your account...
        </p>

        <div className={css.progressBar}>
          <motion.div
            className={css.progress}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default GoogleRedirect;
