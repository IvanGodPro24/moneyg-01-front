import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CiCircleChevUp } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import { ClipLoader } from "react-spinners";

import {
  selectHasNextPage,
  selectHasPreviousPage,
  selectIsLoading,
  selectPage,
  selectPerPage,
  selectTotalItems,
  selectTotalPages,
  selectTransactions,
} from "../../redux/transactions/selectors";
import {
  addTransaction,
  deleteTransaction,
  fetchTransactions,
} from "../../redux/transactions/operations";
import { setPerPage } from "../../redux/transactions/slice";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import TransactionCard from "../TransactionCard/TransactionCard";
import useDevice from "../../hooks/useDevice";
import s from "./TransactionList.module.css";
import Pagination from "../Pagination/Pagination";
import EmptyTransaction from "../EmptyTransaction/EmptyTransaction";
import SortableTh from "../SortableTh/SortableTh";
import OptionSelect from "../OptionSelect/OptionSelect";
import { sortOptions } from "../../constants/constants";
import { format } from "date-fns";
import { copyTransactionToClipboard } from "../../utils/copyTransactionToClipboard";
import { toast } from "sonner";

const TransactionList = ({ currentPage, setCurrentPage, filters }) => {
  const dispatch = useDispatch();

  const [copiedId, setCopiedId] = useState(null);

  const handleToggleModal = (modal) => modal.toggleModal();

  const handleCopy = async ({ date, category, comment, sum, type, id }) => {
    try {
      await copyTransactionToClipboard({
        date,
        category,
        comment,
        sum,
        type,
      });
      toast.success("Transaction copied to clipboard");

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 3000);
    } catch (e) {
      toast.error("Failed to copy transaction", e);
    }
  };

  const handleRepeat = async (transaction) =>
    dispatch(addTransaction(transaction));

  const handleDelete = async (id, setLoading) => {
    setLoading(true);
    try {
      await dispatch(deleteTransaction(id)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = (date) => format(new Date(date), "dd.MM.yy");

  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);
  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);
  const totalPages = useSelector(selectTotalPages);
  const totalItems = useSelector(selectTotalItems);
  const hasNextPage = useSelector(selectHasNextPage);
  const hasPreviousPage = useSelector(selectHasPreviousPage);

  const { isMobile } = useDevice();
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const [sortBy, setSortBy] = useState("type");
  const [sortOrder, setSortOrder] = useState(null);

  const handlePerPageChange = (selectedOption) => {
    const newPerPage = selectedOption.value;

    dispatch(setPerPage(newPerPage));
    dispatch(
      fetchTransactions({
        page: 1,
        perPage: newPerPage,
        filters,
        sortOrder,
        sortBy,
      })
    );
    setCurrentPage(1);
  };

  const setSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleSortChange = (selectedOption) => {
    if (!selectedOption) {
      setSortOrder(null);
      return;
    }

    const { field, order } = selectedOption.value;
    setSort(field, order);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(
      fetchTransactions({
        page: currentPage,
        perPage,
        filters,
        sortOrder,
        sortBy,
      })
    );
  }, [dispatch, currentPage, perPage, filters, sortOrder, sortBy]);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== null && value !== ""
  );

  if (!isLoading && (!transactions || transactions.length === 0)) {
    return hasActiveFilters ? (
      <EmptyTransaction filter={true} />
    ) : (
      <EmptyTransaction />
    );
  }

  return (
    <>
      <div className={s.tableWrapper}>
        <table className={s.tableHead}>
          <thead className={s.thead}>
            <tr>
              <SortableTh
                field="date"
                sortOrder={sortOrder}
                sortBy={sortBy}
                onSort={setSort}
                label="Date"
              />
              <SortableTh
                field="type"
                sortOrder={sortOrder}
                sortBy={sortBy}
                onSort={setSort}
                label="Type"
              />
              <SortableTh
                field="categoryTitle"
                sortOrder={sortOrder}
                sortBy={sortBy}
                onSort={setSort}
                label="Category"
              />
              <SortableTh
                field="comment"
                sortOrder={sortOrder}
                sortBy={sortBy}
                onSort={setSort}
                label="Comment"
              />
              <SortableTh
                field="sum"
                sortOrder={sortOrder}
                sortBy={sortBy}
                onSort={setSort}
                label="Sum"
              />
              <th className={s.total}>Total: {totalItems}</th>
              <th className={s.th}>
                <button
                  onClick={() => {
                    setSortOrder(null);
                    setCurrentPage(1);
                  }}
                >
                  <TfiReload className="icon" />
                </button>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div className={s.scrollBody}>
        <table className={s.tableBody}>
          <tbody className={s.tbody}>
            {isLoading ? (
              <tr>
                <td>
                  <div className={s.loader}>
                    <ClipLoader size={100} color="#3498db" />
                  </div>
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <TransactionsItem
                  key={t._id}
                  id={t._id}
                  date={t.date}
                  category={t.categoryId.title}
                  comment={t.comment}
                  sum={t.sum}
                  type={t.type}
                  copiedId={copiedId}
                  formattedDate={formattedDate(t.date)}
                  onToggle={handleToggleModal}
                  onDelete={handleDelete}
                  onRepeat={() =>
                    handleRepeat({
                      date: t.date,
                      category: t.categoryId.title,
                      comment: t.comment,
                      sum: t.sum,
                      type: t.type,
                    })
                  }
                  onCopy={() =>
                    handleCopy({
                      id: t._id,
                      date: formattedDate(t.date),
                      category: t.categoryId.title,
                      comment: t.comment,
                      sum: t.sum,
                      type: t.type,
                    })
                  }
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {isMobile && isLoading ? (
        <div className={s.loader}>
          <ClipLoader size={120} color="#3498db" />
        </div>
      ) : (
        <>
          <OptionSelect
            name="sort"
            options={sortOptions}
            placeholder="Sort by"
            isClearable={true}
            onChange={handleSortChange}
            value={
              sortOptions.find(
                (opt) =>
                  opt.value.field === sortBy && opt.value.order === sortOrder
              ) || null
            }
          />

          <ul className={s.list}>
            {transactions.map((t) => (
              <TransactionCard
                key={t._id}
                id={t._id}
                date={t.date}
                category={t.categoryId.title}
                comment={t.comment}
                sum={t.sum}
                type={t.type}
                copiedId={copiedId}
                formattedDate={formattedDate(t.date)}
                onToggle={handleToggleModal}
                onDelete={handleDelete}
                onRepeat={() =>
                  handleRepeat({
                    date: t.date,
                    category: t.categoryId.title,
                    comment: t.comment,
                    sum: t.sum,
                    type: t.type,
                  })
                }
                onCopy={() =>
                  handleCopy({
                    id: t._id,
                    date: formattedDate(t.date),
                    category: t.categoryId.title,
                    comment: t.comment,
                    sum: t.sum,
                    type: t.type,
                  })
                }
              />
            ))}
          </ul>
        </>
      )}

      {isMobile && (
        <button
          className={`${s.scrollTopBtn} ${showScrollBtn ? s.visible : ""}`}
          onClick={scrollToTop}
        >
          <CiCircleChevUp className={s.UpBtm} />
        </button>
      )}

      <Pagination
        currentPage={page}
        perPage={perPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
        onPerPageChange={handlePerPageChange}
      />
    </>
  );
};

export default TransactionList;
