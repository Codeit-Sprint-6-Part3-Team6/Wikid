import { useRef, useState } from "react";
import axios from "axios";
import useToast from "@hooks/useToast";
import { checkIsEditing, postProfileEdit } from "@lib/api/profileApi";
import { getUserInfo } from "@lib/api/userApi";
import { Code } from "@lib/types/Profile";

function useEditMode() {
  const [isEditMode, setIsEditMode] = useState({
    content: false,
    profile: false,
  });
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isTimeOutModalOpen, setIsTimeOutModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resolveFunction, setResolveFunction] = useState<
    ((value: boolean) => void) | null
  >(null);
  const { toastOpened, showToast } = useToast();
  const timeDelayerRef = useRef<NodeJS.Timeout>();
  const timerRef = useRef<NodeJS.Timeout>();
  const answerRef = useRef("");
  const codeRef = useRef<Code>("");
  const lastRefreshedRef = useRef<number>(Date.now());

  const triggerEditMode = async (code: Code) => {
    const isEditing = await checkIsEditing(code);

    if (isEditing) {
      console.log("editing");
      showToast();
    } else {
      console.log("not editing");
      setIsQuizOpen(true);
      const permission = await askPermissionPromise();
      if (permission) {
        console.log("permission true");
        const isProfileYours = await compareCode(code);
        if (isProfileYours) {
          console.log("mine");
          setIsEditMode({
            content: true,
            profile: true,
          });
        } else {
          console.log("notMine");
          setIsEditMode({
            content: true,
            profile: false,
          });
        }
        timerRef.current = setTimeout(
          () => setIsTimeOutModalOpen(true),
          300000,
        );
        lastRefreshedRef.current = Date.now();
      }
    }
  };

  const compareCode = async (code: Code) => {
    console.log("compareCode");
    try {
      const userInfo = await getUserInfo();
      return userInfo.profile.code === code;
    } catch (error) {
      console.error(error);
    }
  };

  const askPermissionPromise = async () => {
    console.log("askPermission");
    return new Promise<boolean>((resolve) => {
      setResolveFunction(() => resolve);
    });
  };

  const handleQuizOpen = () => {
    setIsQuizOpen((prev) => !prev);
  };

  const handleQuizSubmit = async (answer: string, code: Code) => {
    console.log("handleQuizSubmit");
    answerRef.current = answer;
    codeRef.current = code;
    const result = await tryEdit(answer, code);
    if (result && resolveFunction !== null) {
      resolveFunction(true);
      setResolveFunction(null);
      setIsQuizOpen(false);
    }
  };

  const deleteError = () => {
    setErrorMessage("");
  };

  const tryEdit = async (answer: string, code: Code) => {
    console.log("tryEdit");
    console.log(code);
    try {
      const result = await postProfileEdit({
        code,
        securityAnswer: answer,
      });
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message === "보안 답변이 일치하지 않습니다.") {
          setErrorMessage(error.response.data.message);
        }
      }
    }
  };

  const refreshTimer = async () => {
    clearTimeout(timeDelayerRef.current);
    console.log("refreshTimer 들어옴");
    console.log(300000 - (Date.now() - lastRefreshedRef.current) < 5000);
    timeDelayerRef.current = setTimeout(
      async () => {
        const result = await tryEdit(answerRef.current, codeRef.current);
        if (result) {
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(
            () => setIsTimeOutModalOpen(true),
            300000,
          );
          lastRefreshedRef.current = Date.now();
        } else {
          setIsTimeOutModalOpen(true);
        }
      },
      300000 - (Date.now() - lastRefreshedRef.current) < 5000 ? 300 : 5000, // 시간 얼마 안남았을 때만 바로 업데이트
    );
  };

  return {
    isQuizOpen,
    handleQuizOpen,
    toastOpened,
    handleQuizSubmit,
    triggerEditMode,
    isEditMode,
    refreshTimer,
    isTimeOutModalOpen,
    errorMessage,
    deleteError,
  };
}

export default useEditMode;
