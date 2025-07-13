import { FaCommentDollar, FaMoneyBillWave } from "react-icons/fa6";
import css from "./FilterInput.module.css";
import clsx from "clsx";

const FilterInput = ({ id, type, register, field, placeholder }) => {
  return (
    <label htmlFor={id} className="relative">
      <input
        type={type}
        {...register(field)}
        id={id}
        className={css.input}
        placeholder={placeholder}
      />
      {field === "comment" ? (
        <FaCommentDollar className={clsx("input-icon", css.icon)} />
      ) : (
        <FaMoneyBillWave className={clsx("input-icon", css.icon)} />
      )}
    </label>
  );
};

export default FilterInput;
