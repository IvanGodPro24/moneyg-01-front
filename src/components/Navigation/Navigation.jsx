import { IoMdHome } from "react-icons/io";
import { BiStats } from "react-icons/bi";
import { FaDollarSign } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink className={s.link} to="/home">
            <IoMdHome className={s.icon} />
            <p className={s.title}>Home</p>
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink className={s.link} to="/statistics">
            <BiStats className={s.icon} />
            <p className={s.title}>Statistics</p>
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/currency">
            <FaDollarSign className={s.icon} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
