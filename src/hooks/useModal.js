import { useEffect, useState } from "react";

const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      event.key === "Escape" && closeModal();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};

export default useModal;
