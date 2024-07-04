import axios from "@lib/api/axios";
import { filterProfileProperties } from "@lib/handleProfileProperties";
import {
  Code,
  Profile,
  ProfileList,
  WikiForm,
  profileEditResponse,
  ProfileQueryOptions,
} from "@lib/types/Profile";

export const getProfile = async (code: Code): Promise<Profile> => {
  const res = await axios.get<Profile>(`profiles/${code}`);
  return res.data;
};

export const patchProfile = async (profile: Profile): Promise<Profile> => {
  const requestBody = filterProfileProperties(profile);
  const res = await axios.patch<Profile>(
    `profiles/${profile.code}`,
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
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

export const checkIsEditing = async (code: Code) => {
  try {
    const res = await axios.get<profileEditResponse>(`profiles/${code}/ping`);
    if (res.status === 204) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const postProfileEdit = async ({
  code,
  securityAnswer,
}: {
  code: Code;
  securityAnswer: string;
}) => {
  try {
    const res = await axios.post<profileEditResponse>(`profiles/${code}/ping`, {
      securityAnswer,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
