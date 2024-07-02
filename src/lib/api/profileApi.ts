import axios from "@lib/api/axios";
import { filterProfileProperties } from "@lib/handleProfileProperties";
import {
  Code,
  Profile,
  Pagination,
  ProfileList,
  WikiForm,
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY5LCJ0ZWFtSWQiOiI2LTYiLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTgzMDQ0MSwiZXhwIjoxNzE5ODMyMjQxLCJpc3MiOiJzcC13aWtpZWQifQ.C1M59sX-P9Om_iuduwabe3ILbtectXx9c-Cd36NSrkA",
      },
    },
  );
  return res.data;
};

// 위키 생성하기
export const createWiki = async (questionAndAnswer: WikiForm) => {
  const res = await axios.post("profiles", {
    questionAndAnswer,
  });

  return res;
};

export const getProfileList = async (
  options: Pagination,
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
