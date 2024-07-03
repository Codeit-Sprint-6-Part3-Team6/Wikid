import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "@components/Button";
import Input from "@components/Input";
import Toast from "@components/Toast";
import useSignUpValidation from "@hooks/useSignUpValidation";
import useToast from "@hooks/useToast";
import { postSignUp } from "@lib/api/authApi";
import axios from "@lib/api/axios";

const SignUpForm = () => {
  const { toastOpened, showToast } = useToast();
  const [toastText, setToastText] = useState("");
  const [toastColor, setToastColor] = useState("");

  const router = useRouter();
  const { formData, errors, handleChange, handleBlur } = useSignUpValidation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { name, email, password, passwordConfirmation } = formData;

    try {
      const response = await postSignUp({
        name,
        email,
        password,
        passwordConfirmation,
      });

      if (response.status === 201) {
        setToastText("회원가입에 성공하였습니다");
        setToastColor("green");
        showToast(); // 회원가입 성공 후 페이지 이동 시, 토스트 적용 안됨, 근데 성공했을 때도 알림이 필요한가요?
        router.push("login"); // 회원가입 성공 후 로그인 페이지로 이동
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setToastText(error.response.data.message);
        setToastColor("red");
        showToast();
      } else {
        setToastText("비밀번호 변경에 실패하였습니다");
        setToastColor("red");
        showToast();
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-[50px]">
      <h1 className="text-[24px] font-semibold text-gray800">회원가입</h1>
      <form className="flex flex-col gap-[24px]" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[32px]">
          <div>
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
          className="h-[45px] w-[400px]"
        />
      </form>
      <Toast type={toastColor} isToastOpened={toastOpened}>
        {toastText}
      </Toast>
    </div>
  );
};

export default SignUpForm;
