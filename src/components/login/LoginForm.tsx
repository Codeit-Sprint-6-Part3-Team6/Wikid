import { useState } from "react";
import Button from "@components/Button";
import Input from "@components/Input";
import Toast from "@components/Toast";
import useLoginValidation from "@hooks/useLoginValidation";
import useToast from "@hooks/useToast";
import { useAuth } from "@context/AuthContext";

const LoginForm = () => {
  const { toastOpened, showToast } = useToast();
  const [toastText, setToastText] = useState("");
  const [toastColor, setToastColor] = useState("");

  const { formData, errors, handleChange, handleBlur } = useLoginValidation();
  const { login } = useAuth();

  const isFormValid = formData.email !== "" && formData.password !== "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = formData;

    const error = await login({ email, password });

    if (error instanceof Error) {
      setToastColor("red");
      showToast();
      const errorResponse = error as any;
      if (errorResponse.response && errorResponse.response.status === 400) {
        setToastText(errorResponse.response.data.message);
      } else {
        setToastText("로그인 실패");
      }
    }
  }

  return (
    <div className="flex w-[335px] flex-col items-center justify-center gap-[50px] md:w-[400px]">
      <h1 className="text-[24px] font-semibold text-gray500">로그인</h1>
      <form className="flex w-full flex-col gap-[24px]" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[32px]">
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
        </div>
        <Button
          text="로그인"
          color="green"
          type="submit"
          className="h-[45px] w-full"
          disabled={!isFormValid}
        />
        <Toast type={toastColor} isToastOpened={toastOpened}>
          {toastText}
        </Toast>
      </form>
    </div>
  );
};

export default LoginForm;
