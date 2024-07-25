import { useState } from "react";
import Image from "next/image";
import { CommentType } from "../../lib/types/commentType";
import CardContainer from "./CardContainer";
import CommentInput from "./CommentInput";
import { useAuth } from "@context/AuthContext";
import { formatDate } from "@lib/dateFormatter";
import { validateImage } from "@lib/validateImage";
import deleteIcon from "@icons/ic_delete.svg";
import editIcon from "@icons/ic_edit.svg";
import profileIcon from "@icons/ic_profile.svg";

interface CommentCardProps {
  comment: CommentType;
  onEditComment: (commentId: number, newContent: string) => void;
  onDeleteComment: (commentId: number) => void;
}

const CommentCard = ({ comment, onEditComment, onDeleteComment }: CommentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const imageSrc = validateImage(comment.writer.image);
  const { user } = useAuth();

  const handleEdit = async (newContent: string) => {
    try {
      await onEditComment(comment.id, newContent);
      setIsEditing(false);
    } catch (error) {
      console.error("댓글 수정 실패", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content); // 수정 취소 시 내용 초기화
  };

  const handleDelete = () => {
    if (confirm("댓글을 삭제하시겠습니까?")) {
      onDeleteComment(comment.id);
    }
  };

  const isAuthor = comment.writer.id === user?.id;

  return (
    <CardContainer className="mb-[16px] items-start py-[16px] md:py-[22px] lg:mb-[24px]">
      <div className="flex flex-1 grow items-start gap-[15px] md:gap-[20px]">
        <div className="flex h-[50px] w-[50px] flex-shrink-0">
          <Image
            src={imageSrc}
            alt="프로필 이미지"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="flex w-full flex-col">
          <span className="text-[16px] font-semibold md:mb-[6px] md:text-[18px]">
            {comment.writer.name}
          </span>
          {isEditing ? (
            <CommentInput
              type="edit"
              initialContent={comment.content}
              onSaveComment={handleEdit}
              onCancelEdit={handleCancelEdit}
              className="mb-[10px]"
            />
          ) : (
            <span className="mb-[4px] md:mb-[10px] md:text-[16px]">{comment.content}</span>
          )}
          <span className="text-[12px] text-gray400 md:text-[14px]">
            {formatDate(new Date(comment.createdAt))}
          </span>
        </div>
      </div>
      <div className="flex gap-[20px]">
        {!isEditing && isAuthor && (
          <>
            <Image
              src={editIcon}
              alt="댓글 수정 아이콘"
              onClick={() => setIsEditing(true)}
              className="cursor-pointer"
            />
            <Image
              src={deleteIcon}
              alt="댓글 삭제 아이콘"
              className="cursor-pointer"
              onClick={handleDelete}
            />
          </>
        )}
      </div>
    </CardContainer>
  );
};

export default CommentCard;
