import axios from "@lib/api/axios";
import { CommentType } from "@lib/types/commentType";

export const getComments = async (
  targetId: string,
  limit: number = 10,
): Promise<CommentType[]> => {
  try {
    const res = await axios.get(`articles/${targetId}/comments?limit=${limit}`);
    return res.data.list;
  } catch (err) {
    console.error("댓글 불러오기 실패", err);
    throw err;
  }
};

export const postComment = async (
  targetId: string,
  content: string,
): Promise<CommentType> => {
  try {
    const commentData = {
      content,
    };

    const res = await axios.post<CommentType>(
      `articles/${targetId}/comments`,
      commentData,
    );

    return res.data;
  } catch (err: any) {
    console.error("댓글 등록 실패", err);
    throw err;
  }
};

export const editComment = async (
  commentId: number,
  newContent: string,
): Promise<CommentType> => {
  try {
    const res = await axios.patch<CommentType>(`comments/${commentId}`, {
      content: newContent,
    });

    return res.data;
  } catch (err: any) {
    console.error("댓글 수정 실패", err);
    throw err;
  }
};

export const deleteComment = async (
  commentId: number,
): Promise<CommentType> => {
  try {
    const res = await axios.delete<CommentType>(`comments/${commentId}`);

    return res.data;
  } catch (err: any) {
    console.error("댓글 삭제 실패", err);
    throw err;
  }
};
