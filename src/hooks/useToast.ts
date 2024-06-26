import { useState, useEffect } from "react";

const useToast = () => {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(handleCloseToast, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showToast]);

  return {
    showToast,
    handleShowToast,
  };
};

export default useToast;
