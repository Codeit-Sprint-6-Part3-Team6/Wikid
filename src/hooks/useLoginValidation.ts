import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const useLoginValidation = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});

  const validateLoginForm = () => {
    let validationErrors: LoginErrors = {};

    if (formData.email.trim().length === 0) {
      validationErrors.email = "이메일을 입력해 주세요.";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      validationErrors.email = "이메일 형식으로 작성해 주세요.";
    }

    if (formData.password.trim().length === 0) {
      validationErrors.password = "비밀번호를 입력해 주세요.";
    } else if (formData.password !== "user_set_password") {
      validationErrors.password = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(validationErrors);
    return validationErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name in errors) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let errorMessage = "";

    switch (name) {
      case "email":
        errorMessage =
          formData.email.trim().length === 0
            ? "이메일을 입력해 주세요."
            : !EMAIL_REGEX.test(formData.email)
              ? "이메일 형식으로 작성해 주세요."
              : "";
        break;
      case "password":
        errorMessage =
          formData.password.trim().length === 0
            ? "비밀번호를 입력해 주세요."
            : "";
        break;
      default:
        errorMessage = "";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLoginForm();
    if (Object.keys(validationErrors).length === 0) {
      // 실제 로그인 성공 시 처리하는 로직을 작성해주세요 (리디렉션 등)
      console.log("로그인 성공");
    }
  };

  const clearErrors = () => setErrors({});

  return {
    formData,
    errors,
    setErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    clearErrors,
    validateLoginForm,
  };
};

export default useLoginValidation;
