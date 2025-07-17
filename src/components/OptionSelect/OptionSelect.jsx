import css from "./OptionSelect.module.css";
import icons from "../../img/icons.svg";
import Select from "react-select";
import { useId } from "react";
import clsx from "clsx";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "transparent",
    borderRadius: "12px",
    textAlign: "left",
    border: state.isFocused
      ? "1px solid rgba(255, 255, 255, 1)"
      : "1px solid rgba(255, 255, 255, 0.6)",
    boxShadow: "none",
    height: "50px",
    minWidth: "100px",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    padding: "0 20px",
    transition: "all 0.3s",
    "&:hover": {
      border: state.isDisabled
        ? "1px solid rgba(255, 255, 255, 0.6)"
        : "1px solid rgba(255, 255, 255, 1)",
    },
    background: state.isDisabled ? "rgba(255, 255, 255, 0.05)" : "transparent",
    opacity: state.isDisabled ? 0.7 : 1,
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
    textAlign: "left",
    fontWeight: "500",
    margin: 0,
    fontSize: "16px",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "rgba(189, 189, 189, 0.6)" : "#bdbdbd",
  }),
  menu: (provided) => ({
    ...provided,
    background: `linear-gradient(0deg, 
        rgba(83, 61, 186, 1) 0%, 
        rgba(80, 48, 154, 1) 43.14%, 
        rgba(106, 70, 165, 1) 73.27%, 
        rgba(133, 93, 175, 1) 120.03%);`,
    borderRadius: "12px",
    overflow: "hidden",
    top: 42,
  }),
  menuList: () => ({
    paddingTop: "10px",
    paddingBottom: "10px",
    maxHeight: "160px",
    overflowY: "auto",
    "::-webkit-scrollbar": {
      display: "none",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "rgba(255, 255, 255, 0.1);"
      : state.isFocused
      ? "rgba(255, 255, 255, 0.2)"
      : "transparent",
    color: state.isSelected ? "rgba(255, 134, 141, 1);" : "#fff",
    cursor: "pointer",
    padding: "4px 20px",
    fontSize: 16,
    textAlign: "left",
    transition: "all 0.3s",
    "&:hover": {
      color: "rgba(255, 134, 141, 1)",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const OptionSelect = ({
  name,
  options,
  placeholder,
  onChange,
  value,
  isClearable = false,
  isDisabled = false,
}) => {
  const id = useId();

  return (
    <>
      <label
        htmlFor={id}
        className={clsx(
          !name && css.select,
          ["type", "category"].includes(name) && css.filter,
          name === "sort" && css.sort
        )}
      >
        <Select
          name={name}
          options={options}
          styles={customStyles}
          isClearable={isClearable}
          isSearchable={false}
          isDisabled={isDisabled}
          value={value}
          onChange={onChange}
          inputId={id}
          placeholder={placeholder}
          components={{
            ClearIndicator: ({ innerProps }) => (
              <div {...innerProps} className={css.container}>
                <svg width="16" height="16" className={css.icon}>
                  <use href={`${icons}#icon-close`}></use>
                </svg>
              </div>
            ),
            DropdownIndicator: ({ innerProps, selectProps }) => (
              <div
                {...innerProps}
                className={clsx(css.container)}
                style={{
                  transition: "transform 0.3s ease",
                  transform: selectProps.menuIsOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                <svg width="16" height="16">
                  <use href={`${icons}#icon-arrow-down`}></use>
                </svg>
              </div>
            ),
          }}
        />
      </label>
    </>
  );
};

export default OptionSelect;
