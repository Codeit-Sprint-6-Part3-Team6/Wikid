import axios from "@lib/api/axios";
import {
  Code,
  Profile,
  WikiForm,
  ProfileList,
  ProfileQueryOptions,
} from "@lib/types/Profile";

export const getProfile = async (code: Code): Promise<Profile> => {
  const res = await axios.get<Profile>(`profiles/${code}`);
  return res.data;
};

// 위키 생성하기
export const createWiki = async ({
  securityQuestion,
  securityAnswer,
}: WikiForm) => {
  const res = await axios.post("profiles", {
    securityQuestion,
    securityAnswer,
  });

  return res;
};

export const getProfileList = async (
  options: ProfileQueryOptions,
): Promise<ProfileList> => {
  try {
    const res = await axios.get<ProfileList>("/profiles", {
      params: {
        page: options.page,
        pageSize: options.pageSize,
        name: options.name,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
