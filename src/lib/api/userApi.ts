import axios from "@lib/api/axios";
import { ChangePasswordForm } from "@lib/types/User";
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
}: ChangePasswordForm) => {
  const res = await axios.patch("users/me/password", {
    currentPassword,
    password,
    passwordConfirmation,
  });

  return res;
};
