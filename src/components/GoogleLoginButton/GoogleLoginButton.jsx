import css from "./GoogleLoginButton.module.css";
import icons from "../../img/icons.svg";
import axios from "axios";

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const { data } = await axios.get("/auth/get-oauth-url");

      window.location.href = data.url;
    } catch (error) {
      console.error("Failed to get Google OAuth URL:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className={css["google-btn"]}
    >
      <svg width="20" height="20" className={css.icon}>
        <use href={`${icons}#icon-google`}></use>
      </svg>
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
