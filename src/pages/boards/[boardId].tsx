import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "@components/Button";
import LinkButton from "@components/LinkButton";
import CardContainer from "@components/article/CardContainer";
import Comment from "@components/boards/Comment";
import { deleteArticle, getArticle } from "@lib/api/articleApi";
import { formatDate } from "@lib/dateFormatter";
import { ArticleType } from "@lib/types/articleType";
import heartIcon from "@icons/ic_heart.svg";

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

  const handleEditArticle = () => {
    if (article) {
      router.push({
        pathname: "/addboard",
        query: {
          id: boardId,
          title: article.title,
          image: article.image,
          content: article.content,
        },
      });
    }
  };

  const handleDeleteArticle = async () => {
    if (!boardId) return;
    if (confirm("게시글을 삭제하시겠습니까?"))
      try {
        await deleteArticle(boardId);
        alert("게시글이 삭제되었습니다.");
        router.push("/boards");
      } catch (err) {
        console.error("게시글 삭제 실패", err);
        alert("게시글 삭제에 실패했습니다.");
      }
  };

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
              onClick={handleEditArticle}
              className="h-[45px] w-[140px] transition-all duration-500 hover:bg-green300"
            />
            <Button
              text="삭제하기"
              color="green"
              type="button"
              onClick={handleDeleteArticle}
              className="h-[45px] w-[140px] transition-all duration-500 hover:bg-green300"
            />
          </div>
        </div>
        <div className="mb-[38px] flex w-full justify-between">
          <div className="flex gap-2.5 text-gray400">
            <p>{article.writer.name}</p>
            <p>{formatDate(new Date(article.createdAt))}</p>
          </div>
          <p className="flex items-center gap-1 text-gray400">
            <Image src={heartIcon} alt="하트 아이콘" /> {article.likeCount}
          </p>
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
      {boardId && typeof boardId === "string" && <Comment boardId={boardId} />}
    </div>
  );
};

export default ArticlePage;
