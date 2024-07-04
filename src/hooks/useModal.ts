import { useState } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  function handleIsOpen() {
    setIsOpen((prevState) => !prevState);
  }

  return [isOpen, handleIsOpen];
}
