import css from "./Sum.module.css";
import { TbArrowsSort } from "react-icons/tb";

const Sum = ({ isFiltered, toggleFiltered }) => {
  return (
    <div className={css.container}>
      <span>Sum</span>
      <button
        onClick={toggleFiltered}
        className={isFiltered ? "rotate-180" : "rotate-0"}
      >
        <TbArrowsSort className="icon"/>
      </button>
    </div>
  );
};

export default Sum;
