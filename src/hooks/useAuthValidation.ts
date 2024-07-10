import { useState } from "react";
import { ErrorsType } from "@lib/types/Auth";

const EMAIL_REGEX = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

const ErrorMessage: { [key: string]: string } = {
  name: "이름을",
  email: "이메일을",
  password: "비밀번호를",
  passwordConfirmation: "비밀번호 확인을",
  currentPassword: "비밀번호를",
};

const useAuthValidation = <T extends ErrorsType>(type: string) => {
  let initialErrors: T;

  if (type === "login") {
    initialErrors = { email: "", password: "" } as T;
  } else if (type === "signup") {
    initialErrors = {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    } as T;
  } else {
    initialErrors = {
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
    } as T;
  }

  const [errors, setErrors] = useState<T>(initialErrors);

  const checkValidation = (name: string, value: string, password?: string) => {
    let errorMessage = "";

    if (value === "") {
      errorMessage = `${ErrorMessage[name]} 입력해 주세요.`;
    } else {
      switch (name) {
        case "name":
          if (value.length > 10) {
            errorMessage = "10자 이하로 작성해주세요.";
          }
          break;
        case "email":
          if (!EMAIL_REGEX.test(value)) {
            errorMessage = "이메일 형식으로 작성해 주세요.";
          }
          break;
        case "password":
        case "currentPassword":
          if (value.length < 8) {
            errorMessage = "8자 이상 입력해주세요.";
          }
          break;
        case "passwordConfirmation":
          if (value !== password) {
            errorMessage = "비밀번호가 일치하지 않습니다.";
          }
          break;
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  return {
    errors,
    checkValidation,
  };
};

export default useAuthValidation;
