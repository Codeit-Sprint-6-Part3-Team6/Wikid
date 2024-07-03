import axios from "@lib/api/axios";
import { SignUpForm, SignInForm } from "@lib/types/Auth";

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

// 로그인
export const postSignIn = async ({ email, password }: SignInForm) => {
  const res = await axios.post("auth/signIn", {
    email,
    password,
  });

  return res;
};
