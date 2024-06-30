import axios from "axios";
import { ArticleType } from "@lib/types/articleType";

export const getArticle = async (
  targetId: string | string[],
): Promise<ArticleType> => {
  try {
    const res = await axios.get(`/api/6-6/articles/${targetId}`); // 프록시 설정에 따라 경로 설정
    return res.data;
  } catch (err) {
    console.error("게시글 불러오기 실패", err);
    throw err;
  }
};

export const hardCodedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY2LCJ0ZWFtSWQiOiI2LTYiLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTc3OTk0NywiZXhwIjoxNzE5NzgxNzQ3LCJpc3MiOiJzcC13aWtpZWQifQ.Iktk6VxCatE0d_JER0lmKssbCLUxRRgbsDKt24KrhfM";

export const deleteArticle = async (
  targetId: string | string[],
): Promise<ArticleType> => {
  try {
    const res = await axios.delete<ArticleType>(
      `/api/6-6/articles/${targetId}`,
      {
        headers: {
          Authorization: `Bearer ${hardCodedToken}`,
        },
      },
    );

    return res.data;
  } catch (err: any) {
    console.error("게시글 삭제 실패", err);
    throw err;
  }
};

export const editArticle = async (
  targetId: string | string[],
  newTitle: string,
  newImage: string,
  newContent: string,
): Promise<ArticleType> => {
  try {
    const res = await axios.patch<ArticleType>(
      `/api/6-6/articles/${targetId}`,
      {
        title: newTitle,
        image: newImage,
        content: newContent,
      },
      {
        headers: {
          Authorization: `Bearer ${hardCodedToken}`,
        },
      },
    );

    console.log("게시글 수정 성공", res.data);
    return res.data;
  } catch (err: any) {
    console.error("게시글 수정 실패", err);
    throw err;
  }
};
