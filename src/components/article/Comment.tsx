import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import {
  getComments,
  editComment,
  postComment,
  deleteComment,
} from "@lib/api/commentApi";
import { CommentType } from "@lib/types/commentType";

interface CommentProps {
  boardId: string;
}

const Comment = ({ boardId }: CommentProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (boardId) {
          const fetchedComments = await getComments(boardId);
          setComments(fetchedComments);
        }
      } catch (err) {
        console.error("댓글 불러오기 실패", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [boardId]);

  const handlePostComment = async (content: string) => {
    try {
      const newComment = await postComment(boardId, content);
      setComments([newComment, ...comments]);
    } catch (err) {
      throw err;
    }
  };

  const handleEditComment = async (commentId: number, newContent: string) => {
    try {
      const updatedComment = await editComment(commentId, newContent);
      const updatedComments = comments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment,
      );
      setComments(updatedComments);
    } catch (err) {
      console.error("댓글 수정 실패", err);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      const filteredComments = comments.filter(
        (comment) => comment.id !== commentId,
      );
      setComments(filteredComments);
    } catch (err) {
      console.error("댓글 삭제 실패", err);
    }
  };

  if (isLoading) {
    return <div className="mt-8 text-center">로딩 중 ...</div>;
  }

  return (
    <section className="w-full max-w-[1060px]">
      <p className="text-lg font-semibold">
        댓글 <span className="text-green200">{comments.length}</span>{" "}
      </p>
      <CommentInput
        onSaveComment={handlePostComment}
        className="mb-[24px] mt-[14px] lg:mb-[42px]"
      />
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          onEditComment={handleEditComment}
          onDeleteComment={handleDeleteComment}
        />
      ))}
    </section>
  );
};

export default Comment;
