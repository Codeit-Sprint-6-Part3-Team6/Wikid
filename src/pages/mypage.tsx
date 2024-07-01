import React from "react";
import ChangePasswordForm from "@components/mypage/ChangePasswordForm";
import CreateWikiForm from "@components/mypage/CreateWikiForm";

const SignUpPage = () => {
  return (
    <div className="mt-[141px] flex flex-col items-center justify-center gap-[64px]">
      <h1 className="text-[24px] font-semibold text-gray500">계정 설정</h1>
      <ChangePasswordForm />
      <hr className="w-[400px] border-t-[1px] border-solid border-gray200" />
      <CreateWikiForm />
    </div>
  );
};

export default SignUpPage;
