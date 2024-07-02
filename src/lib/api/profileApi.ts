import axios from "@lib/api/axios";
import { ProfileList, ProfilePagination } from "@lib/types/Pagination";
import { Code, Profile } from "@lib/types/Profile";

export const getProfile = async (code: Code): Promise<Profile> => {
  const res = await axios.get<Profile>(`profiles/${code}`);
  return res.data;
};

export const getProfileList = async (
  options: ProfilePagination,
): Promise<ProfileList> => {
  try {
    const res = await axios.get<ProfileList>("/profiles", {
      params: {
        page: options.page,
        pageSize: options.pageSize,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
