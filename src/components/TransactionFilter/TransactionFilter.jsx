import { useForm } from "react-hook-form";
import OptionSelect from "../OptionSelect/OptionSelect";
import css from "./TransactionFilter.module.css";
import Calendar from "../Calendar/Calendar";
import icons from "../../img/icons.svg";
import { useCallback, useId, useState } from "react";
import FilterInput from "../FilterInput/FilterInput";
import { categoriesOptions, typeOptions } from "../../constants/constants";
import clsx from "clsx";

const TransactionFilter = () => {
  const minSumId = useId();
  const maxSumId = useId();
  const dateId = useId();
  const commentId = useId();

  {
    /* type: parsedType,
    categoryTitle: parsedCategoryTitle,
    minSum: parsedMinSum,
    maxSum: parsedMaxSum,
    dateFrom: parsedDateFrom,
    dateTo: parsedDateTo,
    comment: parsedComment, */
  }

  const { register, handleSubmit, setValue, reset } = useForm();

  const [filter, setFilter] = useState({
    type: null,
    categoryTitle: null,
    minSum: null,
    maxSum: null,
    dateFrom: null,
    dateTo: null,
    comment: null,
  });

  const onSubmit = ({ minSum, maxSum, comment }) => {
    const submitData = {
      type: filter.type,
      categoryTitle: filter.categoryTitle,
      minSum: Number(minSum),
      maxSum: Number(maxSum),
      dateFrom: filter.dateFrom,
      dateTo: filter.dateTo,
      comment,
    };
  };

  const handleDateChange = useCallback(
    (field, value) => {
      setValue(field, value);
      setFilter((prev) => ({ ...prev, [field]: value }));
    },
    [setValue]
  );

  const handleSelectChange = useCallback(
    (field, selectedOption) => {
      const value = selectedOption ? selectedOption.value : null;
      setValue(field, value);
      setFilter((prev) => ({ ...prev, [field]: value }));
    },
    [setValue]
  );

  const handleReset = () => {
    reset();
    setFilter({
      type: null,
      categoryTitle: null,
      minSum: null,
      maxSum: null,
      dateFrom: null,
      dateTo: null,
      comment: null,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <OptionSelect
        name="type"
        options={typeOptions}
        value={typeOptions.find((option) => option.value === filter.type)}
        onChange={(selectedOption) =>
          handleSelectChange("type", selectedOption)
        }
        placeholder="Select type"
      />

      <OptionSelect
        name="category"
        options={categoriesOptions}
        value={categoriesOptions.find(
          (option) => option.value === filter.categoryTitle
        )}
        onChange={(selectedOption) =>
          handleSelectChange("categoryTitle", selectedOption)
        }
        placeholder="Select category"
      />

      <FilterInput
        id={minSumId}
        type="number"
        register={register}
        field="minSum"
        placeholder="Type a min sum"
      />

      <FilterInput
        id={maxSumId}
        type="number"
        register={register}
        field="maxSum"
        placeholder="Type a max sum"
      />

      <label htmlFor={dateId} className={clsx(css.picker, "relative")}>
        <Calendar
          values={filter}
          setFieldValue={handleDateChange}
          id={dateId}
          range={true}
          filter={true}
        />
        <svg width="24" height="24" className={css["picker-icon"]}>
          <use href={`${icons}#icon-date-range`}></use>
        </svg>

        {/* <ErrorMessage name="date" component="div" className="errorText" /> */}
      </label>

      <FilterInput
        id={commentId}
        type="text"
        register={register}
        field="comment"
        placeholder="Search comments"
      />

      <div className={css.container}>
        <button type="submit" className={clsx("delete", css.btn)}>
          Apply
        </button>

        <button
          type="button"
          onClick={handleReset}
          className={clsx(css.btn, css["reset-btn"])}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default TransactionFilter;
