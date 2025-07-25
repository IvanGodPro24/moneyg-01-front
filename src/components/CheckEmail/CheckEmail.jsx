// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import s from "../../pages/LoginPage/LoginPage.module.css";
import css from "./CheckEmail.module.css";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";

const CheckEmail = () => {
  return (
    <motion.div
      className={s.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <title>Check Your Email</title>

      <div className={css.card}>
        <div className={css.iconContainer}>
          <CiMail size={48} color="var(--icon-violet)" />
          <div className={css.circlePulse}></div>
        </div>

        <h1 className={css.title}>Check Your Email</h1>

        <p className={css.message}>
          We've sent a password reset link to your email address. Please check
          your inbox and follow the instructions.
        </p>

        <div className={css.tips}>
          <p className={css.tip}>Didn't receive the email?</p>
          <ul className={css.tipList}>
            <li>Check your spam folder</li>
            <li>Make sure you entered the correct email</li>
            <li>Wait a few minutes and try again</li>
          </ul>
        </div>

        <Link className={css.resendButton} to="/forgot">
          Resend Email
        </Link>
      </div>
    </motion.div>
  );
};

export default CheckEmail;
