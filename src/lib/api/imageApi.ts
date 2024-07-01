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
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY5LCJ0ZWFtSWQiOiI2LTYiLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTgxOTQ4MCwiZXhwIjoxNzE5ODIxMjgwLCJpc3MiOiJzcC13aWtpZWQifQ.FkXpW8MujekYB0gOv4A_9EKPi9AnWXpTX0Tig-bE-O0",
    },
  });
  return res.data;
};
