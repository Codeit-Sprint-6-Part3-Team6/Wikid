import axios from "axios";
import instance from "@lib/api/axios";
import { ArticleList, ArticlePagination } from "@lib/types/Pagination";
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

export const getArticleList = async (
  options: ArticlePagination,
): Promise<ArticleList> => {
  try {
    const res = await instance.get<ArticleList>("/articles", {
      params: {
        page: options.page,
        pageSize: options.pageSize,
        orderBy: options.orderBy,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
