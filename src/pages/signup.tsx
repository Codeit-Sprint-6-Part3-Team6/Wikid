import React from "react";
import Input from "@components/Input";
import useSignUpValidation from "@hooks/useSignUpValidation";

const SignUpPage: React.FC = () => {
  const { formData, errors, handleChange, handleBlur, handleSubmit } =
    useSignUpValidation();

  // 테스트용 코드입니다.
  return (
    <div className="flex h-screen items-center justify-center">
      <form className="w-[400px]" onSubmit={handleSubmit}>
        <Input
          label="이름"
          type="text"
          name="name"
          placeholder="이름을 입력해 주세요"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && (
          <p className="text-xs italic text-red-500">{errors.name}</p>
        )}
        <Input
          label="이메일"
          type="email"
          name="email"
          placeholder="이메일을 입력해 주세요"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && (
          <p className="text-xs italic text-red-500">{errors.email}</p>
        )}
        <Input
          label="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && (
          <p className="text-xs italic text-red-500">{errors.password}</p>
        )}
        <Input
          label="비밀번호 확인"
          type="password"
          name="passwordConfirmation"
          placeholder="비밀번호를 입력해 주세요"
          value={formData.passwordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.passwordConfirmation && (
          <p className="text-xs italic text-red-500">
            {errors.passwordConfirmation}
          </p>
        )}
        <button
          type="submit"
          className="bg-green300 hover:bg-green200 mt-4 w-[400px] rounded-lg px-4 py-2 font-bold text-white transition-all duration-500"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
