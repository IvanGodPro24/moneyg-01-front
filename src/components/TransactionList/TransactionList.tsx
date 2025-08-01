import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
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
import useExchangeRates from "../../hooks/useExchangeRates";
import { selectActiveCurrency } from "../../redux/currency/selectors";
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
import { Copy, TransactionListProps } from "./TransactionList.types";
import { TransactionType } from "../../redux/transactions/transactions.types";
import { ModalType } from "../../hooks/useModal.types";
import { NumberOptions, SortOptions } from "../../constants/constants.types";
import { SingleValue } from "react-select";

const TransactionList = ({
  currentPage,
  setCurrentPage,
  filters,
}: TransactionListProps) => {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(selectTransactions);
  const isLoading = useAppSelector(selectIsLoading);
  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const totalPages = useAppSelector(selectTotalPages);
  const totalItems = useAppSelector(selectTotalItems);
  const hasNextPage = useAppSelector(selectHasNextPage);
  const hasPreviousPage = useAppSelector(selectHasPreviousPage);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleToggleModal = (modal: ModalType) => modal.toggleModal();

  const handleCopy = async ({
    date,
    category,
    comment,
    sum,
    type,
    id,
  }: Copy) => {
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
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error("Failed to copy transaction: " + e.message);
      } else {
        toast.error("Failed to copy transaction");
      }
    }
  };

  const handleRepeat = async (transaction: TransactionType) => {
    await dispatch(addTransaction(transaction)).unwrap();

    if (totalItems) {
      const newTotalPages = Math.ceil((totalItems + 1) / perPage);

      if (newTotalPages > currentPage) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleDelete = async (
    id: string,
    setLoading: (arg: boolean) => void
  ) => {
    setLoading(true);
    try {
      await dispatch(deleteTransaction(id)).unwrap();

      if (transactions.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = (date: string) => format(new Date(date), "dd.MM.yy");

  const { convertCurrency } = useExchangeRates();
  const activeCurrency = useAppSelector(selectActiveCurrency);

  const convertedSum = (sum: number) =>
    convertCurrency(sum, "UAH", activeCurrency);

  const { isMobile } = useDevice();
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const [sortBy, setSortBy] = useState<string>("type");
  const [sortOrder, setSortOrder] = useState<string | null>(null);

  const handlePerPageChange = (
    selectedOption: SingleValue<NumberOptions> | null
  ) => {
    const newPerPage = selectedOption && selectedOption.value;

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

  const setSort = (field: string, order: string) => {
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleSortChange = (
    selectedOption: SingleValue<SortOptions> | null
  ) => {
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
                  convertedSum={convertedSum(t.sum)}
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
          <OptionSelect<SortOptions>
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
                convertedSum={convertedSum(t.sum)}
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
