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
