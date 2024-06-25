import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 회원가입 폼 데이터 타입 정의
interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// 회원가입 폼 각 input에 대한 오류 메시지를 담을 객체 타입 정의
interface SignUpErrors {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

const useSignUpValidation = () => {
  // 폼 데이터 및 오류 상태 초기화
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState<SignUpErrors>({});

  // 회원가입 폼 유효성 검사 함수
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
    // 검증 결과를 오류 상태에 업데이트하고 리턴
    setErrors(validationErrors);
    return validationErrors;
  };

  // input 값 변경 이벤트 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // 오류가 있었다면 해당 필드의 오류 초기화
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

    // 검증 결과를 오류 상태에 업데이트
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  // 폼 제출 이벤트 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSignUpForm();
    // 검증 결과에 따른 처리 로직 (임시로 콘솔에 로그 출력)
    if (Object.keys(validationErrors).length === 0) {
      // 실제 회원가입 성공 시 처리하는 로직을 작성해주세요. (서버로 데이터 전송, 리디렉션 등)
      console.log("회원가입 성공");
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
    validateSignUpForm,
  };
};

export default useSignUpValidation;
