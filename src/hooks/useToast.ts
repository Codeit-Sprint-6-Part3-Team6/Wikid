import { useState, useEffect } from "react";

const useToast = () => {
  const [toastOpened, setToastOpened] = useState(false);

  const showToast = () => {
    setToastOpened(true);
  };

  const closeToast = () => {
    setToastOpened(false);
  };

  useEffect(() => {
    if (toastOpened) {
      const timer = setTimeout(closeToast, 2300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toastOpened]);

  return {
    toastOpened,
    showToast,
  };
};

export default useToast;
