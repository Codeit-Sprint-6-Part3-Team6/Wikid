import React, { useState } from "react";
import Button from "@components/Button";
import Input from "@components/Input";
import Toast from "@components/Toast";
import useAuthValidation from "@hooks/useAuthValidation";
import useToast from "@hooks/useToast";
import { useAuth } from "@context/AuthContext";
import { SignUpFormDataType } from "@lib/types/Auth";

const SignUpForm = () => {
  const { toastOpened, showToast } = useToast();
  const [toastText, setToastText] = useState("");
  const { signup } = useAuth();
  const { errors, checkValidation } =
    useAuthValidation<SignUpFormDataType>("signup");
  const [formData, setFormData] = useState<SignUpFormDataType>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "passwordConfirmation") {
      checkValidation(e.target.name, e.target.value, formData["password"]);
    } else {
      checkValidation(e.target.name, e.target.value);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { name, email, password, passwordConfirmation } = formData;

    const error = await signup({ name, email, password, passwordConfirmation });

    if (error instanceof Error) {
      showToast();

      const errorResponse = error as any;
      if (errorResponse.response && errorResponse.response.status === 400) {
        setToastText(errorResponse.response.data.message);
      } else {
        setToastText("회원가입 실패");
      }
    }
  }

  const isSubmitDisabled =
    Object.values(formData).some((value) => value === "") ||
    Object.values(errors).some((value) => value !== "");

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
              error={errors.passwordConfirmation}
            />
          </div>
        </div>
        <Button
          text="가입하기"
          color="green"
          type="submit"
          className="h-[45px] w-full"
          disabled={isSubmitDisabled}
        />
      </form>
      <Toast type="red" isToastOpened={toastOpened}>
        {toastText}
      </Toast>
    </div>
  );
};

export default SignUpForm;
