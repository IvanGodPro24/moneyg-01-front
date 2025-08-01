import clsx from "clsx";
import css from "./SortableTh.module.css";
import { TbArrowsSort } from "react-icons/tb";
import { SortableThProps } from "./SortableTh.types";

const SortableTh = ({
  field,
  label,
  sortOrder,
  sortBy,
  onSort,
}: SortableThProps) => {
  const isActive = sortBy === field;
  const nextOrder = isActive && sortOrder === "asc" ? "desc" : "asc";

  return (
    <th className={css.th}>
      <button
        onClick={() => onSort(field, nextOrder)}
        className={clsx(css["sort-btn"])}
      >
        {label}
        <TbArrowsSort
          className={clsx(
            "icon",
            isActive && sortOrder === "desc" ? "rotate-180" : "rotate-0"
          )}
        />
      </button>
    </th>
  );
};

export default SortableTh;
