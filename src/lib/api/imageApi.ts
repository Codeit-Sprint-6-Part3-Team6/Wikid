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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY5LCJ0ZWFtSWQiOiI2LTYiLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTgxMzIyNSwiZXhwIjoxNzE5ODE1MDI1LCJpc3MiOiJzcC13aWtpZWQifQ.4F9hM9vGcIuY1U2yQkLILog5x9Zaa8kyarQ7CJA3TEs",
    },
  });
  return res.data;
};
