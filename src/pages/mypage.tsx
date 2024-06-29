import React from "react";
import Link from "next/link";
import ChangePasswordForm from "@components/mypage/ChangePasswordForm";

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <ChangePasswordForm />
    </div>
  );
};

export default SignUpPage;
