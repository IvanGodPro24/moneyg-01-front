import css from "./OptionSelect.module.css";
import Select from "react-select";
import { useId } from "react";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "transparent",
    borderRadius: "8px",
    border: state.isFocused
      ? "1px solid rgba(255, 255, 255, 1)"
      : "1px solid rgba(255, 255, 255, 0.6)",
    boxShadow: "none",
    height: "50px",
    minWidth: "150px",
    cursor: "pointer",
    padding: "0 20px",
    transition: "all 0.3s",
    "&:hover": {
      border: "1px solid rgba(255, 255, 255, 1)",
    },
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
  placeholder: (provided) => ({
    ...provided,
    color: "#bdbdbd",
  }),
  menu: (provided) => ({
    ...provided,
    background: `linear-gradient(0deg, 
        rgba(83, 61, 186, 1) 0%, 
        rgba(80, 48, 154, 1) 43.14%, 
        rgba(106, 70, 165, 1) 73.27%, 
        rgba(133, 93, 175, 1) 120.03%);`,
    borderRadius: "8px",
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
  dropdownIndicator: (provided, state) => ({
    color: "#fff",
    transition: "transform 0.3s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
  }),
};

const OptionSelect = ({ name, options, placeholder, onChange, value }) => {
  const id = useId();

  return (
    <Select
      name={name}
      options={options}
      styles={customStyles}
      isSearchable={false}
      value={value}
      onChange={onChange}
      inputId={id}
      className={!name && css.select}
      placeholder={placeholder}
    />
  );
};

export default OptionSelect;
