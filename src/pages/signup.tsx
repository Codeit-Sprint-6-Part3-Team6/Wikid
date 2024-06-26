import React from "react";
import Input from "@components/Input";
import useSignUpValidation from "@hooks/useSignUpValidation";

const SignUpPage: React.FC = () => {
  const { formData, errors, handleChange, handleBlur, handleSubmit } =
    useSignUpValidation();

  // 테스트용 코드입니다.
  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Input
          type="text"
          name="name"
          placeholder="이름을 입력해 주세요"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
        />
        <Input
          type="email"
          name="email"
          placeholder="이메일을 입력해 주세요"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />
        <Input
          type="password"
          name="passwordConfirmation"
          placeholder="비밀번호를 입력해 주세요"
          value={formData.passwordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.passwordConfirmation}
        />
        <button
          type="submit"
          className="mt-4 w-[400px] rounded-lg bg-green300 px-4 py-2 font-bold text-white transition-all duration-500 hover:bg-green200"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
