import { Link, useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import Logo from "../Logo/Logo";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import Modal from "../Modal/Modal";
import s from "./Header.module.css";
import clsx from "clsx";
import UserModal from "../UserModal/UserModal";
import useModal from "../../hooks/useModal";
import { useState } from "react";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, avatarURL, email, registrationDate } =
    useAppSelector(selectUser);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const logoutModal = useModal();
  const userModal = useModal();

  const handleUserModalClose = () => {
    setAvatar(null);
    userModal.closeModal();
  };

  const handleLogoutConfirm = async () => {
    setLoading(true);
    try {
      await dispatch(logout()).unwrap();
      localStorage.clear();
      navigate("/login");
      logoutModal.closeModal();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
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
            <img src={avatarURL} alt={name || ""} className={s.img} />
          ) : (
            name && name[0]
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
      <Modal
        isOpen={logoutModal.isOpen}
        isLoading={loading}
        onConfirm={handleLogoutConfirm}
        onCancel={logoutModal.closeModal}
        text="Are you sure you want to exit?"
        confirm="logout"
      />
    </header>
  );
};

export default Header;
