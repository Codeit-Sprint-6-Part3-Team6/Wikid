import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 로그인 폼 데이터 타입 정의
interface LoginFormData {
  email: string;
  password: string;
}

// 로그인 폼 각 input에 대한 오류 메시지를 담을 객체 타입 정의
interface LoginErrors {
  email?: string;
  password?: string;
}

const useLoginValidation = () => {
  // 폼 데이터 및 오류 상태 초기화
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});

  // 로그인 폼 유효성 검사 함수
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
    // 검증 결과를 오류 상태에 업데이트하고 리턴
    setErrors(validationErrors);
    return validationErrors;
  };

  // input 값 변경 이벤트 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name in errors) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  // input 포커스 아웃(Blur) 이벤트 처리
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let errorMessage = "";

    // 각 input에 따른 검증 로직 설정
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

    // 검증 결과를 오류 상태에 업데이트
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  // 폼 제출 이벤트 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLoginForm();
    // 검증 결과에 따른 처리 로직 (임시로 콘솔에 로그 출력)
    if (Object.keys(validationErrors).length === 0) {
      // 실제 로그인 성공 시 처리하는 로직을 작성해주세요. (리디렉션 등)
      console.log("로그인 성공");
    }
  };
  // 오류 상태 초기화 함수
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
