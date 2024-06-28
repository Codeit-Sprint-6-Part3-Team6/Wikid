import axios from "@lib/api/axios";
import { Code, Profile } from "@lib/types/Profile";

export const getProfile = async (code: Code): Promise<Profile> => {
  const res = await axios.get<Profile>(`profiles/${code}`);
  return res.data;
};
