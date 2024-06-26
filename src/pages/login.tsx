import Input from "@components/Input";
import useLoginValidation from "@hooks/useLoginValidation";

const LoginPage: React.FC = () => {
  const { formData, errors, handleChange, handleBlur, handleSubmit } =
    useLoginValidation();

  // 테스트용 코드입니다.
  return (
    <div className="flex h-screen items-center justify-center">
      <form className="w-[400px]" onSubmit={handleSubmit}>
        <Input
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
        <button
          type="submit"
          className="mt-4 w-[400px] rounded-lg bg-green300 px-4 py-2 font-bold text-white transition-all duration-500 hover:bg-green200"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
