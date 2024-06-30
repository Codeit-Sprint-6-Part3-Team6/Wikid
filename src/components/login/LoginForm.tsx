import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Button from "@components/Button";
import Input from "@components/Input";
import useLoginValidation from "@hooks/useLoginValidation";
import { useAuth } from "@context/AuthContext";
import axios from "@lib/api/axios";

const LoginForm = () => {
  const { formData, errors, handleChange, handleBlur } = useLoginValidation();
  const router = useRouter();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = formData;

    const response = await axios.post("auth/signIn", {
      email,
      password,
    });

    const { accessToken, refreshToken } = response.data;

    // httpOnly 속성은 서버에서 생성한 쿠키에 대해서만 적용됨, secure: true를 해도 적용되지 않음
    Cookies.set("accessToken", accessToken, { secure: true });
    Cookies.set("refreshToken", refreshToken, { secure: true });

    login();
    router.push("/"); // 로그인 성공 후 메인페이지로 이동
  }

  return (
    <div className="flex flex-col items-center justify-center gap-[50px]">
      <h1 className="text-[24px] font-semibold text-gray500">로그인</h1>
      <form className="flex flex-col gap-[24px]" onSubmit={handleSubmit}>
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
          className="h-[45px] w-[400px]"
        />
      </form>
    </div>
  );
};

export default LoginForm;
