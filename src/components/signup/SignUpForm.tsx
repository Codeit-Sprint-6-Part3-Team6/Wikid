import React, { useState } from "react";
import Button from "@components/Button";
import Input from "@components/Input";
import Toast from "@components/Toast";
import useSignUpValidation from "@hooks/useSignUpValidation";
import useToast from "@hooks/useToast";
import { useAuth } from "@context/AuthContext";

const SignUpForm = () => {
  const { toastOpened, showToast } = useToast();
  const [toastText, setToastText] = useState("");
  const [toastColor, setToastColor] = useState("");

  const { signup } = useAuth();
  const { formData, errors, handleChange, handleBlur } = useSignUpValidation();

  const isFormValid =
    formData.name !== "" &&
    formData.email !== "" &&
    formData.password &&
    formData.passwordConfirmation;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { name, email, password, passwordConfirmation } = formData;

    const error = await signup({ name, email, password, passwordConfirmation });

    if (error instanceof Error) {
      setToastColor("red");
      showToast();

      const errorResponse = error as any;
      if (errorResponse.response && errorResponse.response.status === 400) {
        setToastText(errorResponse.response.data.message);
      } else {
        setToastText("회원가입 실패");
      }
    }
  }

  return (
    <div className="flex w-[335px] flex-col items-center justify-center gap-[50px] md:w-[400px]">
      <h1 className="text-[24px] font-semibold text-gray800">회원가입</h1>
      <form className="flex w-full flex-col gap-[24px]" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[10px]">
            <label>이름</label>
            <Input
              type="text"
              name="name"
              placeholder="이름을 입력해 주세요"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label>이메일</label>
            <Input
              type="email"
              name="email"
              placeholder="이메일을 입력해 주세요"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label>비밀번호</label>
            <Input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label>비밀번호 확인</label>
            <Input
              type="password"
              name="passwordConfirmation"
              placeholder="비밀번호를 입력해 주세요"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.passwordConfirmation}
            />
          </div>
        </div>
        <Button
          text="가입하기"
          color="green"
          type="submit"
          className="h-[45px] w-full"
          disabled={!isFormValid}
        />
      </form>
      <Toast type={toastColor} isToastOpened={toastOpened}>
        {toastText}
      </Toast>
    </div>
  );
};

export default SignUpForm;
