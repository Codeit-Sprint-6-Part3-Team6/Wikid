import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useErrorMessage from "./useErrorMessage";
import { useAuth } from "@context/AuthContext";
import { useToast } from "@context/ToastContext";
import { useWikiTimeLimit } from "@context/WikiTimeLimitContext";
import { checkIsEditing, postProfileEdit } from "@lib/api/profileApi";
import { Code } from "@lib/types/Profile";

function useEditMode() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const {
    isTimeOutModalOpen,
    setIsTimeOutModalOpen,
    timeDelayerRef,
    timerRef,
    lastRefreshedRef,
    answerRef,
    codeRef,
  } = useWikiTimeLimit();
  const { showToast, setToastMessage } = useToast();
  const { errorMessage, setErrorMessage, clearErrorMessage } = useErrorMessage();
  const [resolveFunction, setResolveFunction] = useState<((value: boolean) => void) | null>(null);

  const { user } = useAuth();
  const router = useRouter();

  const triggerEditMode = async (code: Code) => {
    const isEditing = await checkIsEditing(code);

    if (isEditing && isEditing.userId !== user?.id) {
      setToastMessage("다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.");
      showToast();
    } else if (isEditing && isEditing.userId === user?.id) {
      refreshTimer();
      compareCode(code)
        ? router.replace(`${code}/edit-profile`)
        : router.replace(`${code}/edit-wiki`);
    } else {
      setIsQuizOpen(true);
      const permission = await askPermissionPromise();
      if (permission) {
        compareCode(code)
          ? router.replace(`${code}/edit-profile`)
          : router.replace(`${code}/edit-wiki`);
        timerRef.current = setTimeout(() => setIsTimeOutModalOpen(true), 300000);
        lastRefreshedRef.current = Date.now();
      }
    }
  };

  const compareCode = (code: Code) => {
    return user?.profile.code === code;
  };

  const askPermissionPromise = async () => {
    return new Promise<boolean>((resolve) => {
      setResolveFunction(() => resolve);
    });
  };

  const handleQuizOpen = () => {
    setIsQuizOpen((prev) => !prev);
  };

  const handleQuizSubmit = async (answer: string, code: Code) => {
    window?.localStorage.setItem("answer", answer);
    if (typeof code === "string") window?.localStorage.setItem("code", code);
    const result = await tryEdit(answer, code);
    if (result && resolveFunction !== null) {
      resolveFunction(true);
      setResolveFunction(null);
      setIsQuizOpen(false);
    }
  };

  const tryEdit = async (answer: string, code: Code) => {
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

    timeDelayerRef.current = setTimeout(
      async () => {
        renewAuthority();
      },
      300000 - (Date.now() - lastRefreshedRef.current) < 5000 ? 300 : 5000, // 시간 얼마 안남았을 때만 바로 업데이트
    );
  };

  const renewAuthority = async () => {
    const result = await tryEdit(answerRef.current, codeRef.current);
    if (result) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsTimeOutModalOpen(true), 300000);
      lastRefreshedRef.current = Date.now();
    } else {
      setIsTimeOutModalOpen(true);
    }
  };

  return {
    isQuizOpen,
    handleQuizOpen,
    handleQuizSubmit,
    triggerEditMode,
    refreshTimer,
    renewAuthority,
    isTimeOutModalOpen,
    errorMessage,
    clearErrorMessage,
  };
}

export default useEditMode;
