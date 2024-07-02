import axios from "@lib/api/axios";
import { SignUpForm } from "@lib/types/Auth";

// 회원가입
export const postSignUp = async ({
  name,
  email,
  password,
  passwordConfirmation,
}: SignUpForm) => {
  const res = await axios.post("auth/signUp", {
    name,
    email,
    password,
    passwordConfirmation,
  });

  return res;
};
