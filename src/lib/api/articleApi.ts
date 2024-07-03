import axios from "axios";
import instance from "@lib/api/axios";
import { ArticleList, ArticlePagination } from "@lib/types/Pagination";
import Cookies from "js-cookie";
import { ArticleType } from "@lib/types/articleType";

export const getAccessToken = () => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("쿠키에서 accessToken을 찾을 수 없습니다.");
  }
  return accessToken;
};

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
export const deleteArticle = async (
  targetId: string | string[],
): Promise<ArticleType> => {
  try {
    const res = await axios.delete<ArticleType>(
      `/api/6-6/articles/${targetId}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
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
          Authorization: `Bearer ${getAccessToken()}`,
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

export const postArticle = async (
  title: string,
  image: string,
  content: string,
): Promise<ArticleType> => {
  try {
    const requestData: any = {
      title,
      content,
    };

    if (image.trim() !== "") {
      requestData.image = image;
    }

    const res = await axios.post<ArticleType>(
      `/api/6-6/articles`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("게시글 등록 성공", res.data);
    return res.data;
  } catch (err: any) {
    console.error("게시글 등록 실패", err);
    throw err;
  }
};
