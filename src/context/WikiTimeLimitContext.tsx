import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
  MutableRefObject,
  useEffect,
} from "react";
import { Code } from "@lib/types/Profile";

type WikiTimeLimitContextType = {
  isTimeOutModalOpen: boolean;
  setIsTimeOutModalOpen: Dispatch<SetStateAction<boolean>>;
  timeDelayerRef: MutableRefObject<NodeJS.Timeout | undefined>;
  timerRef: MutableRefObject<NodeJS.Timeout | undefined>;
  lastRefreshedRef: MutableRefObject<number>;
  answerRef: MutableRefObject<string>;
  codeRef: MutableRefObject<Code>;
};

const WikiTimeLimitContext = createContext<WikiTimeLimitContextType | null>(null);

export const WikiTimeLimitProvider = ({ children }: { children: ReactNode }) => {
  const [isTimeOutModalOpen, setIsTimeOutModalOpen] = useState(false);

  const timeDelayerRef = useRef<NodeJS.Timeout>();
  const timerRef = useRef<NodeJS.Timeout>();
  const lastRefreshedRef = useRef<number>(Date.now());
  const answerRef = useRef("");
  const codeRef = useRef<Code>("");

  useEffect(() => {
    const answer = window?.localStorage.getItem("answer");
    if (answer) answerRef.current = answer;

    const code = window?.localStorage.getItem("code");
    if (code) codeRef.current = code;
  }, []);

  return (
    <WikiTimeLimitContext.Provider
      value={{
        isTimeOutModalOpen,
        setIsTimeOutModalOpen,
        timeDelayerRef,
        timerRef,
        lastRefreshedRef,
        answerRef,
        codeRef,
      }}
    >
      {children}
    </WikiTimeLimitContext.Provider>
  );
};

export const useWikiTimeLimit = () => {
  const context = useContext(WikiTimeLimitContext);
  if (!context) {
    throw new Error("useWikiTimeLimit must be used within an WikiTimeLimitProvider");
  }
  return context;
};
