import axios from "@lib/api/axios";
import { Code, Profile, WikiForm } from "@lib/types/Profile";

export const getProfile = async (code: Code): Promise<Profile> => {
  const res = await axios.get<Profile>(`profiles/${code}`);
  return res.data;
};

// 위키 생성하기
export const createWiki = async (questionAndAnswer: WikiForm) => {
  const res = await axios.post("profiles", {
    questionAndAnswer,
  });

  return res;
};
