import { Link, useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../Logo/Logo";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import LogoutModal from "../LogoutModal/LogoutModal";
import s from "./Header.module.css";
import clsx from "clsx";
import UserModal from "../UserModal/UserModal";
import useModal from "../../hooks/useModal";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, avatarURL, email, registrationDate } = useSelector(selectUser);

  const [avatar, setAvatar] = useState(null);

  const logoutModal = useModal();
  const userModal = useModal();

  const handleUserModalClose = () => {
    setAvatar(null);
    userModal.closeModal();
  };

  const handleLogoutConfirm = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.log(error.message);
    } finally {
      localStorage.clear();
      navigate("/login");
      logoutModal.closeModal(false);
    }
  };

  return (
    <header className={s.header}>
      <Link to="/dashboard/home" className={s.containerLogo}>
        <Logo width={19} height={23} />
        <h2 className={s.title}>Money Guard</h2>
      </Link>
      <div className={s.exit}>
        <button
          className={clsx(s.avatar, "relative", avatarURL && "transparent")}
          onClick={userModal.openModal}
        >
          {avatarURL ? (
            <img src={avatarURL} alt={name} className={s.img} />
          ) : (
            name[0]
          )}
        </button>

        <UserModal
          isOpen={userModal.isOpen}
          onCancel={handleUserModalClose}
          name={name}
          email={email}
          avatar={avatar}
          setAvatar={setAvatar}
          avatarURL={avatarURL}
          date={registrationDate}
        />

        <button className={s.btn} onClick={logoutModal.openModal}>
          <IoExitOutline className={s.exitBtn} />
          <span className={s.span}>Exit</span>
        </button>
      </div>
      <LogoutModal
        isOpen={logoutModal.isOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={logoutModal.closeModal}
      />
    </header>
  );
};

export default Header;
