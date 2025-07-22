import clsx from "clsx";
import RegistrationForm from "../../components/Auth/RegistrationForm/RegistrationForm";
import s from "../LoginPage/LoginPage.module.css";
import css from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={clsx(s.page, css["registration-page"])}>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
