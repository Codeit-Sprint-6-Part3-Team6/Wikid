import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@context/AuthContext";
import { deleteLike, postLike } from "@lib/api/articleApi";
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
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const handleLikeToggle = async () => {
    if (!isLoggedIn) {
      const confirmed = window.confirm(
        "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?",
      );
      if (confirmed) {
        router.push("/login");
      }
    } else {
      try {
        if (isLiked) {
          const updatedArticle = await deleteLike(targetId);
          setLikeCount(updatedArticle.likeCount);
        } else {
          const updatedArticle = await postLike(targetId);
          setLikeCount(updatedArticle.likeCount);
        }
        setIsLiked((prevIsLiked) => !prevIsLiked);
      } catch (err) {
        console.error("좋아요 토글 실패", err);
      }
    }
  };

  return (
    <p className="flex items-center gap-2 text-gray400">
      <Image
        src={isLiked ? likeOnIcon : likeOffIcon}
        alt="좋아요 아이콘"
        onClick={handleLikeToggle}
        className="w-[16px] cursor-pointer md:w-[18px]"
      />{" "}
      {likeCount}
    </p>
  );
};

export default LikeToggleButton;
