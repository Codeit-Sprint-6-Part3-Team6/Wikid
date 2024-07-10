import axios from "@lib/api/axios";
import { ChangePasswordFormDataType } from "@lib/types/Auth";
import { UserInfo } from "@lib/types/UserInfo";

// 유저 정보 불러오기
export const getUserInfo = async () => {
  try {
    const res = await axios.get<UserInfo>("users/me");
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 비밀번호 변경
export const patchUserPassword = async ({
  currentPassword,
  password,
  passwordConfirmation,
}: ChangePasswordFormDataType) => {
  const res = await axios.patch("users/me/password", {
    currentPassword,
    password,
    passwordConfirmation,
  });

  return res;
};
