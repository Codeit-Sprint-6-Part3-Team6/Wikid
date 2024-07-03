import { useState } from "react";
import { AxiosError } from "axios";
import Toast from "@components/Toast";
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
  const [resolveFunction, setResolveFunction] = useState<
    ((value: boolean) => void) | null
  >(null);
  const { toastOpened, showToast } = useToast();

  const triggerEditMode = async (code: Code) => {
    const isEditing = await checkIsEditing(code);

    if (isEditing) {
      console.log("editing");
      showToast();
    } else {
      console.log("not editing");
      setIsQuizOpen(true);
      const permission = await someFunc();
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

  const someFunc = async () => {
    console.log("someFunc");
    return new Promise<boolean>((resolve) => {
      setResolveFunction(() => resolve);
    });
  };

  const handleModalOpen = () => {
    setIsQuizOpen((prev) => !prev);
  };

  const handleQuizSubmit = async (answer: string, code: Code) => {
    console.log("handleQuizSumbit");
    await tryEdit(answer, code);
  };

  const tryEdit = async (answer: string, code: Code) => {
    console.log("tryEdit");
    console.log(code);
    try {
      const result = await postProfileEdit({
        code,
        securityAnswer: answer,
      });
      if (result && resolveFunction !== null) {
        resolveFunction(true);
        setResolveFunction(null);
        setIsQuizOpen(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "보안 답변이 일치하지 않습니다.") {
          alert(error.message);
        }
      }
    }
  };

  return {
    isQuizOpen,
    handleModalOpen,
    toastOpened,
    handleQuizSubmit,
    triggerEditMode,
    isEditMode,
  };
}

export default useEditMode;
