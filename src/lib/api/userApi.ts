import axios from "@lib/api/axios";

// 유저 정보 불러오기
export const getUserInfo = async () => {
  const res = await axios.get("users/me");
  return res.data;
};
