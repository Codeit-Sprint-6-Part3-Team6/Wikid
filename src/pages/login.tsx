import Input from "@components/Input";
import useLoginValidation from "@hooks/useLoginValidation";

const LoginPage = () => {
  const { formData, errors, handleChange, handleBlur, validateLoginForm } =
    useLoginValidation();

  // 폼 제출 이벤트 처리
  // 실제 로그인 성공 시 처리하는 로직을 작성해주세요. (리디렉션 등)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLoginForm();
    if (Object.keys(validationErrors).length === 0) {
      // if (Object.keys(validationErrors).length === 0): 객체의 키 배열을 반환하는 코드로, length === 0은 오류가 없다는 것을 의미함
      console.log("로그인 성공"); // <-- 여기에 로직을 작성해주시면 됩니다.
    }
  };

  // 테스트용 코드입니다.
  return (
    <div className="flex h-screen items-center justify-center">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
