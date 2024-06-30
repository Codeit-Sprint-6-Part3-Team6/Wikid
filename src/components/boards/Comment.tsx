import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import { getComments, postComment } from "@lib/api/commentApi";
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
      console.error("댓글 등록 실패", err);
    }
  };

  if (isLoading) {
    return <div className="mt-8 text-center">로딩 중 ...</div>;
  }

  return (
    <section className="m-[60px] w-full max-w-[1060px]">
      <p className="text-lg font-semibold">
        댓글 <span className="text-green200">{comments.length}</span>{" "}
      </p>
      <CommentInput
        onSaveComment={handlePostComment}
        className="mb-[42px] mt-[14px]"
      />
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </section>
  );
};

export default Comment;
