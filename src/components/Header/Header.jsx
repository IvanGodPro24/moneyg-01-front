import { Link, useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Logo from "../Logo/Logo";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import LogoutModal from "../LogoutModal/LogoutModal";
import s from "./Header.module.css";
import clsx from "clsx";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name } = useSelector(selectUser);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.log(error.message);
    } finally {
      localStorage.clear();
      navigate("/login");
      setIsModalOpen(false);
    }
  };

  return (
    <header className={s.header}>
      <Link to="/dashboard/home" className={s.containerLogo}>
        <Logo width={19} height={23} />
        <h2 className={s.title}>Money Guard</h2>
      </Link>
      <div className={s.exit}>
        <p className={clsx(s.name, 'relative')}>{name || "Name"}</p>
        <button className={s.btn} onClick={handleLogoutClick}>
          <IoExitOutline className={s.exitBtn} />
          <span className={s.span}>Exit</span>
        </button>
      </div>
      <LogoutModal
        className={s.model}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onConfirm={handleLogoutConfirm}
        onCancel={handleCloseModal}
      />
    </header>
  );
};

export default Header;
