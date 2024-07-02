import { signIn } from "next-auth/react";
import Link from "next/link";
import LoginForm from "@components/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="mt-[261px] flex flex-col items-center gap-[40px]">
      <LoginForm />
      <Link
        href="/signup"
        className="text-[14px] font-normal text-green200 underline decoration-solid"
      >
        회원가입
      </Link>
    </div>
  );
};

export default LoginPage;
