import axios from "@lib/api/axios";
import { UserInfo } from "@lib/types/UserInfo";

// 유저 정보 불러오기
export const getUserInfo = async () => {
  const res = await axios.get<UserInfo>("users/me");
  return res.data;
};
