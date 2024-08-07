import axios from "@lib/api/axios";
import {
  ArticleType,
  ArticleList,
  ArticleQueryOptions,
  PostArticleProps,
  PatchArticleProps,
} from "@lib/types/articleType";

export const getArticle = async (targetId: string | string[]): Promise<ArticleType> => {
  try {
    const res = await axios.get(`articles/${targetId}`); // 프록시 설정에 따라 경로 설정
    return res.data;
  } catch (err) {
    console.error("게시글 불러오기 실패", err);
    throw err;
  }
};

export const getArticleList = async (options: ArticleQueryOptions): Promise<ArticleList> => {
  try {
    const res = await axios.get<ArticleList>("/articles", {
      params: {
        page: options.page,
        pageSize: options.pageSize,
        orderBy: options.orderBy,
        keyword: options.keyword,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const deleteArticle = async (targetId: string | string[]): Promise<ArticleType> => {
  try {
    const res = await axios.delete<ArticleType>(`articles/${targetId}`);
    return res.data;
  } catch (err: any) {
    console.error("게시글 삭제 실패", err);
    throw err;
  }
};

export const editArticle = async ({
  title,
  image,
  content,
  id,
}: PatchArticleProps): Promise<ArticleType> => {
  try {
    const res = await axios.patch<ArticleType>(`articles/${id}`, {
      title,
      image,
      content,
    });
    return res.data;
  } catch (err: any) {
    console.error("게시글 수정 실패", err);
    throw err;
  }
};

export const postArticle = async ({
  title,
  image,
  content,
}: PostArticleProps): Promise<ArticleType> => {
  try {
    const requestData: any = {
      title,
      content,
    };

    if (image.trim() !== "") {
      requestData.image = image;
    }

    const res = await axios.post<ArticleType>(`articles`, requestData);

    return res.data;
  } catch (err: any) {
    console.error("게시글 등록 실패", err);
    throw err;
  }
};

export const postLike = async (targetId: string): Promise<ArticleType> => {
  try {
    const res = await axios.post(`articles/${targetId}/like`);
    return res.data;
  } catch (err) {
    console.error("좋아요 실패", err);
    throw err;
  }
};

export const deleteLike = async (targetId: string): Promise<ArticleType> => {
  try {
    const res = await axios.delete(`articles/${targetId}/like`);
    return res.data;
  } catch (err) {
    console.error("좋아요 취소 실패", err);
    throw err;
  }
};
