import React from "react";
import Link from "next/link";
import SignUpForm from "@components/signup/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="mt-[153px] flex flex-col items-center gap-[40px]">
      <SignUpForm />
      <div className="flex gap-[10px]">
        <p className="text-[14px] font-normal text-gray400">
          이미 회원이신가요?
        </p>
        <Link
          href="/login"
          className="text-[14px] font-normal text-green200 underline decoration-solid"
        >
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
