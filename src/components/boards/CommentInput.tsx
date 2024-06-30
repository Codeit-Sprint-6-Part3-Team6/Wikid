import { useState, useEffect } from "react";
import Button from "@components/Button";
import { inputCounter } from "@utils/inputCounter";

interface CommentInputProps {
  onSaveComment?: (content: string) => void;
  onCancelEdit?: () => void;
  initialContent?: string;
  className?: string;
  type?: "edit" | "create";
}

const CommentInput = ({
  onSaveComment,
  onCancelEdit,
  initialContent = "",
  className = "",
  type = "create",
}: CommentInputProps) => {
  const [inputCount, setInputCount] = useState(0);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setInputCount(initialContent.length);
  }, [initialContent]);

  const handleInputCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    inputCounter(e, setInputCount, setContent);
  };

  const handleSave = () => {
    if (content.trim()) {
      onSaveComment(content);
      if (type === "create") {
        setContent("");
        setInputCount(0); // 댓글 등록 후 input 초기화
      }
    }
  };

  return (
    <div
      className={`${className} mx-auto flex min-h-[120px] w-full flex-wrap justify-end gap-[10px] rounded-lg bg-gray50 px-[15px] py-[13px]`}
    >
      <textarea
        value={content}
        onChange={handleInputCount}
        placeholder="댓글을 입력해 주세요"
        maxLength={500}
        className="w-full rounded-md bg-gray50 p-1 ring-gray200 focus:bg-white focus:ring-1"
      />
      <div className="flex w-full items-end justify-between text-gray300">
        <p>
          <span>{inputCount}</span>
          <span> / 500</span>
        </p>
        <div className="flex gap-[5px]">
          {type === "edit" && (
            <Button
              type="button"
              text="취소"
              color="white"
              className="h-[30px] w-[55px] rounded-md bg-white text-[12px]"
            />
          )}
          <Button
            type="button"
            text={type === "edit" ? "저장" : "댓글 등록"}
            color="green"
            className={`rounded-md transition-all duration-500 hover:bg-green300 ${
              type === "edit"
                ? "h-[30px] w-[55px] text-[12px]"
                : "h-[45px] w-[120px]"
            }`}
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
