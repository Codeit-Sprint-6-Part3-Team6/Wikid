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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY5LCJ0ZWFtSWQiOiI2LTYiLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTgzMDQ0MSwiZXhwIjoxNzE5ODMyMjQxLCJpc3MiOiJzcC13aWtpZWQifQ.C1M59sX-P9Om_iuduwabe3ILbtectXx9c-Cd36NSrkA",
    },
  });
  return res.data;
};
