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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY5LCJ0ZWFtSWQiOiI2LTYiLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTgxMzIyNSwiZXhwIjoxNzE5ODE1MDI1LCJpc3MiOiJzcC13aWtpZWQifQ.4F9hM9vGcIuY1U2yQkLILog5x9Zaa8kyarQ7CJA3TEs",
      },
    },
  );
  return res.data;
};
