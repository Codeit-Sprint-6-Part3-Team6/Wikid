import { useState } from "react";
import Button from "@components/Button";
import Input from "@components/Input";
import useAuthValidation from "@hooks/useAuthValidation";
import { useAuth } from "@context/AuthContext";
import { LoginFormDataType } from "@lib/types/Auth";

const LoginForm = () => {
  const { login } = useAuth();
  const { errors, checkValidation } = useAuthValidation<LoginFormDataType>("login");
  const [formData, setFormData] = useState<LoginFormDataType>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    checkValidation(e.target.name, e.target.value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { email, password } = formData;

    login({ email, password });
  }

  const isSubmitDisabled =
    Object.values(formData).some((value) => value === "") ||
    Object.values(errors).some((value) => value !== "");

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
        </div>
        <Button
          text="로그인"
          color="green"
          type="submit"
          className="h-[45px] w-full"
          disabled={isSubmitDisabled}
        />
      </form>
    </div>
  );
};

export default LoginForm;
