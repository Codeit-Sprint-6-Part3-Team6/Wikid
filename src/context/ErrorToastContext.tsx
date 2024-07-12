import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import Toast from "@components/Toast";

type ToastContextType = {
  showToast: () => void;
  setErrorMessage: Dispatch<SetStateAction<string>>;
};

const ErrorToastContext = createContext<ToastContextType | null>(null);

export const ErrorToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastOpened, setToastOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <ErrorToastContext.Provider value={{ showToast, setErrorMessage }}>
      {children}
      <Toast isToastOpened={toastOpened} type="red">
        {errorMessage}
      </Toast>
    </ErrorToastContext.Provider>
  );
};

export const useErrorToast = () => {
  const context = useContext(ErrorToastContext);
  if (!context) {
    throw new Error("useErrorToast must be used within an ErrorToastProvider");
  }
  return context;
};
