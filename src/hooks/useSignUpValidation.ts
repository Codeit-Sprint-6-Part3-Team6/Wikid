import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpErrors {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

const useSignUpValidation = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState<SignUpErrors>({});

  const validateSignUpForm = () => {
    let validationErrors: SignUpErrors = {};

    if (formData.name.trim().length === 0) {
      validationErrors.name = "이름을 입력해 주세요.";
    } else if (formData.name.length > 10) {
      validationErrors.name = "10자 이하로 작성해주세요.";
    }

    if (formData.email.trim().length === 0) {
      validationErrors.email = "이메일을 입력해 주세요.";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      validationErrors.email = "이메일 형식으로 작성해 주세요.";
    }

    if (formData.password.trim().length === 0) {
      validationErrors.password = "비밀번호를 입력해 주세요.";
    } else if (formData.password.length < 8) {
      validationErrors.password = "8자 이상 입력해주세요.";
    }

    if (formData.passwordConfirmation.trim().length === 0) {
      validationErrors.passwordConfirmation = "비밀번호 확인을 입력해 주세요.";
    } else if (formData.password !== formData.passwordConfirmation) {
      validationErrors.passwordConfirmation = "비밀번호가 일치하지 않습니다.";
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
      case "name":
        errorMessage =
          formData.name.trim().length === 0
            ? "이름을 입력해 주세요."
            : formData.name.length > 10
              ? "10자 이하로 작성해주세요."
              : "";
        break;
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
            : formData.password.length < 8
              ? "8자 이상 입력해주세요."
              : "";
        break;
      case "passwordConfirmation":
        errorMessage =
          formData.passwordConfirmation.trim().length === 0
            ? "비밀번호 확인을 입력해 주세요."
            : formData.password !== formData.passwordConfirmation
              ? "비밀번호가 일치하지 않습니다."
              : "";
        break;
      default:
        errorMessage = "";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSignUpForm();
    if (Object.keys(validationErrors).length === 0) {
      // 실제 회원가입 성공 시 처리하는 로직을 작성해주세요. (서버로 데이터 전송, 리디렉션 등)
      console.log("회원가입 성공");
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
    validateSignUpForm,
  };
};

export default useSignUpValidation;
