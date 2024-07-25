import axios from "@lib/api/axios";
import { SignUpFormDataType, LoginFormDataType, AuthResponseType } from "@lib/types/Auth";

// 회원가입
export const postSignUp = async ({
  name,
  email,
  password,
  passwordConfirmation,
}: SignUpFormDataType): Promise<AuthResponseType> => {
  const res = await axios.post<AuthResponseType>("auth/signUp", {
    name,
    email,
    password,
    passwordConfirmation,
  });

  return res.data;
};

// 로그인
export const postSignIn = async ({
  email,
  password,
}: LoginFormDataType): Promise<AuthResponseType> => {
  const res = await axios.post<AuthResponseType>("auth/signIn", {
    email,
    password,
  });

  return res.data;
};
