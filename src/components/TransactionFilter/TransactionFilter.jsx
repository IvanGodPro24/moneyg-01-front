import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import OptionSelect from "../OptionSelect/OptionSelect";
import css from "./TransactionFilter.module.css";
import icons from "../../img/icons.svg";
import { useEffect, useId, useRef } from "react";
import FilterInput from "../FilterInput/FilterInput";
import { categoriesOptions, typeOptions } from "../../constants/constants";
import clsx from "clsx";
import DateRangeController from "../DateRangeController/DateRangeController";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const validationSchema = yup.object({
  minSum: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .positive("Min sum must be a positive")
    .test(
      "min-max-validation",
      "Min sum cannot be greater than max",
      function (value) {
        const { maxSum } = this.parent;
        if (value !== null && maxSum !== null && value > maxSum) {
          return false;
        }
        return true;
      }
    ),
  maxSum: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .positive("Max sum must be a positive")
    .test(
      "max-min-validation",
      "Max sum cannot be less than min",
      function (value) {
        const { minSum } = this.parent;
        if (value !== null && minSum !== null && value < minSum) {
          return false;
        }
        return true;
      }
    ),
  type: yup.string().nullable(),
  categoryTitle: yup.string().nullable(),
  dateFrom: yup.date().nullable(),
  dateTo: yup.date().nullable(),
  comment: yup.string().nullable(),
});

const TransactionFilter = ({ filters, onApplyFilters }) => {
  const minSumId = useId();
  const maxSumId = useId();
  const dateId = useId();
  const commentId = useId();

  const wasFilterApplied = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: filters,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset(filters);
  }, [filters, reset]);

  const onSubmit = (data) => {
    const selectedType = data.type;
    const isCategoryDisabled = selectedType === "income";

    const newFilters = {
      ...data,
      categoryTitle: isCategoryDisabled ? null : data.categoryTitle,
      minSum: data.minSum ? Number(data.minSum) : null,
      maxSum: data.maxSum ? Number(data.maxSum) : null,
      comment: data.comment || null,
    };

    onApplyFilters(newFilters);

    wasFilterApplied.current = true;
  };

  const handleReset = () => {
    const emptyFilters = {
      type: null,
      categoryTitle: null,
      minSum: null,
      maxSum: null,
      dateFrom: null,
      dateTo: null,
      comment: null,
    };

    onApplyFilters(emptyFilters);

    wasFilterApplied.current = false;
  };

  const filtersValues = watch();

  const isAnyFilterSelected = Object.values(filtersValues).some(
    (value) => value !== null && value !== ""
  );

  const shouldShowReset = isAnyFilterSelected || wasFilterApplied.current;

  const selectedType = watch("type");

  const isCategoryDisabled = selectedType === "income";

  useEffect(() => {
    if (selectedType === "income" && filtersValues.categoryTitle !== null) {
      reset({ ...filtersValues, categoryTitle: null });
    }
  }, [selectedType, reset, filtersValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <OptionSelect
            name="type"
            options={typeOptions}
            placeholder="Select type"
            isClearable={true}
            onChange={(option) => field.onChange(option?.value || null)}
            value={typeOptions.find((o) => o.value === field.value) || null}
          />
        )}
      />

      <Controller
        name="categoryTitle"
        control={control}
        render={({ field }) => (
          <OptionSelect
            name="category"
            options={categoriesOptions}
            placeholder="Select category"
            isClearable={true}
            isDisabled={isCategoryDisabled}
            onChange={(option) => field.onChange(option?.value || null)}
            value={
              categoriesOptions.find((o) => o.value === field.value) || null
            }
          />
        )}
      />

      <div className="relative">
        <FilterInput
          id={minSumId}
          type="number"
          register={register}
          field="minSum"
          placeholder="Min sum"
        />
        {errors.minSum && (
          <span className={css.error}>{errors.minSum.message}</span>
        )}
      </div>

      <div className="relative">
        <FilterInput
          id={maxSumId}
          type="number"
          register={register}
          field="maxSum"
          placeholder="Max sum"
        />
        {errors.maxSum && (
          <span className={css.error}>{errors.maxSum.message}</span>
        )}
      </div>

      <DateRangeController
        control={control}
        id={dateId}
        className={clsx(css.picker, "relative")}
        icon={
          <svg width="24" height="24" className={css["picker-icon"]}>
            <use href={`${icons}#icon-date-range`}></use>
          </svg>
        }
      />

      <FilterInput
        id={commentId}
        type="text"
        register={register}
        field="comment"
        placeholder="Search comments"
      />

      <div className={css.container}>
        <button
          type="submit"
          className={clsx("delete", css.btn)}
          disabled={!isAnyFilterSelected}
        >
          Apply
        </button>

        <AnimatePresence>
          {shouldShowReset && (
            <motion.div
              key="reset-button"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                type="button"
                onClick={handleReset}
                className={clsx(css.btn, css["reset-btn"])}
              >
                Reset
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default TransactionFilter;
