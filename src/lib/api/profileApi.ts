import axios from "@lib/api/axios";
import { filterProfileProperties } from "@lib/handleProfileProperties";
import { Code, Profile } from "@lib/types/Profile";

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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY5LCJ0ZWFtSWQiOiI2LTYiLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTgxOTQ4MCwiZXhwIjoxNzE5ODIxMjgwLCJpc3MiOiJzcC13aWtpZWQifQ.FkXpW8MujekYB0gOv4A_9EKPi9AnWXpTX0Tig-bE-O0",
      },
    },
  );
  return res.data;
};
