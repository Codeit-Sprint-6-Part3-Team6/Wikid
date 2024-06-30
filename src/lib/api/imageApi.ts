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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY5LCJ0ZWFtSWQiOiI2LTYiLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTU3NzY4NywiZXhwIjoxNzE5NTc5NDg3LCJpc3MiOiJzcC13aWtpZWQifQ.uTglCHz0tcKq_xOgL1kpmcz9HKyHLXzzTuMxk6GhSZw",
    },
  });
  return res.data;
};
