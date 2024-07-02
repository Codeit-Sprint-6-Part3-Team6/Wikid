import { useState } from "react";
import Image from "next/image";
import { handleLikeOff, handleLikeOn } from "@lib/api/articleApi";
import likeOffIcon from "@icons/ic_heartEmpty.svg";
import likeOnIcon from "@icons/ic_heartFill.svg";

interface LikeToggleButtonProps {
  targetId: string;
  initialLiked: boolean;
  initialLikeCount: number;
}

const LikeToggleButton = ({
  targetId,
  initialLiked,
  initialLikeCount,
}: LikeToggleButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        const updatedArticle = await handleLikeOff(targetId);
        setLikeCount(updatedArticle.likeCount);
      } else {
        const updatedArticle = await handleLikeOn(targetId);
        setLikeCount(updatedArticle.likeCount);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("좋아요 토글 실패", err);
    }
  };

  return (
    <p className="flex items-center gap-1 text-gray400">
      <Image
        src={isLiked ? likeOnIcon : likeOffIcon}
        alt="좋아요 아이콘"
        onClick={handleLikeToggle}
        className="w-[15px] cursor-pointer"
      />{" "}
      {likeCount}
    </p>
  );
};

export default LikeToggleButton;