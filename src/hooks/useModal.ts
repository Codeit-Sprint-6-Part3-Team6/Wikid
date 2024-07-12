import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    setIsOpen((prevState) => !prevState);
  }

  return { isOpen, toggleIsOpen };
};

export default useModal;
