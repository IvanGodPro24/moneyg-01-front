import { IoMdHome } from "react-icons/io";
import { BiStats } from "react-icons/bi";
import { FaDollarSign } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

import s from "./Navigation.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink className={buildLinkClass} to="/dashboard/home">
            <IoMdHome className={s.icon} />
            <p className={s.title}>Home</p>
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink className={buildLinkClass} to="/dashboard/statistics">
            <BiStats className={s.icon} />
            <p className={s.title}>Statistics</p>
          </NavLink>
        </li>
        <li className={s.dollar}>
          <NavLink className={buildLinkClass} to="/dashboard/currency">
            <FaDollarSign className={s.icon} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
