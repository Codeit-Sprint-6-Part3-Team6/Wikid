import {
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
  setToastType: Dispatch<SetStateAction<string>>;
  setToastMessage: Dispatch<SetStateAction<string>>;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastOpened, setToastOpened] = useState(false);
  const [toastType, setToastType] = useState("red");
  const [toastMessage, setToastMessage] = useState("");

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
    <ToastContext.Provider value={{ showToast, setToastType, setToastMessage }}>
      {children}
      <Toast isToastOpened={toastOpened} type={toastType}>
        {toastMessage}
      </Toast>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within an ToastProvider");
  }
  return context;
};
