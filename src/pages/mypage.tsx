import React from "react";
import ChangePasswordForm from "@components/mypage/ChangePasswordForm";

const SignUpPage = () => {
  return (
    <div className="mt-[141px] flex flex-col items-center justify-center gap-[64px]">
      <h1 className="text-[24px] font-semibold text-gray500">계정 설정</h1>
      <ChangePasswordForm />
    </div>
  );
};

export default SignUpPage;
