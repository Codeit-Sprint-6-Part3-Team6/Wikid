import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "@components/Button";
import LinkButton from "@components/LinkButton";
import CardContainer from "@components/article/CardContainer";
import LikeToggleButton from "@components/article/LikeToggleButton";
import { getArticle } from "@lib/api/articleApi";
import { formatDate } from "@lib/dateFormatter";
import { ArticleType } from "@lib/types/articleType";

const ArticlePage = () => {
  const router = useRouter();
  const { boardId } = router.query;
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchArticle = async (id: string | string[]) => {
    try {
      setIsLoading(true);
      const nextArticle = await getArticle(id);
      setArticle(nextArticle);
    } catch (err) {
      console.error("게시글 불러오기 실패", err);
      alert("게시글 불러오기에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof boardId === "string" || Array.isArray(boardId)) {
      fetchArticle(boardId);
    } else {
      setIsLoading(false);
    }
  }, [boardId]);

  if (isLoading) {
    return <div className="mt-8 text-center">로딩 중 ...</div>;
  }

  if (!article) {
    return (
      <div className="mt-8 text-center">해당 게시글을 찾지 못했습니다.</div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <CardContainer className="m-[60px] flex-col py-[40px]">
        <div className="mb-6 flex w-full items-center justify-between">
          <h1 className="text-[32px] font-semibold">{article.title}</h1>
          <div className="flex gap-3.5">
            <Button
              text="수정하기"
              color="green"
              type="button"
              className="h-[45px] w-[140px] transition-all duration-500 hover:bg-green300"
            />
            <Button
              text="삭제하기"
              color="green"
              type="button"
              className="h-[45px] w-[140px] transition-all duration-500 hover:bg-green300"
            />
          </div>
        </div>
        <div className="mb-[38px] flex w-full justify-between">
          <div className="flex gap-2.5 text-gray400">
            <p>{article.writer.name}</p>
            <p>{formatDate(new Date(article.createdAt))}</p>
          </div>
          <LikeToggleButton
            targetId={boardId}
            initialLiked={article.isLiked}
            initialLikeCount={article.likeCount}
          />
        </div>
        <Image
          src={article.image}
          alt="게시글 이미지"
          width={800}
          height={600}
        />
        <p className="mt-[25px] text-[16px] leading-relaxed">
          {article.content}
        </p>
      </CardContainer>
      <LinkButton
        text="목록으로"
        link="/boards"
        color="white"
        className="h-[45px] w-[140px] border-[1px] border-solid border-green200 text-green200 transition-all duration-500 hover:bg-green-50 hover:text-green300"
      />
    </div>
  );
};

export default ArticlePage;
