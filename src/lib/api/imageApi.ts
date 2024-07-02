import { getAccessToken } from "./articleApi";
import axios from "@lib/api/axios";

type Url = {
  url: string;
};

export const getImageUrl = async (imageFile: File): Promise<Url> => {
  const imageFormData = new FormData();
  imageFormData.append("image", imageFile);
  const res = await axios.post<Url>("images/upload", imageFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  return res.data;
};
