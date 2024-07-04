import { useState } from "react";

const useModal = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(false);

  function handleIsOpen() {
    setIsOpen((prevState) => !prevState);
  }

  return [isOpen, handleIsOpen];
};

export default useModal;
