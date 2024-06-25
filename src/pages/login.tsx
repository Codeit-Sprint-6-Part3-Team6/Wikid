import Input from "@components/Input";
import useLoginValidation from "@hooks/useLoginValidation";

const LoginPage: React.FC = () => {
  const { formData, errors, handleChange, handleBlur, handleSubmit } =
    useLoginValidation();

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="w-[400px]" onSubmit={handleSubmit}>
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
        <button // 테스트용으로 만든 버튼입니다.
          type="submit"
          className="bg-green300 hover:bg-green200 mt-4 rounded-lg px-4 py-2 font-bold text-white"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
