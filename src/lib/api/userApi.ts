import axios from "@lib/api/axios";

// 유저 정보 불러오기
export const getUserInfo = async () => {
  const res = await axios.get("users/me");
  return res.data;
};

export type ChangePasswordForm = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

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
