import RegistrationForm from "../../components/Auth/RegistrationForm/RegistrationForm";
import css from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={css["registration-page"]}>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
