import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "@components/Button";
import LinkButton from "@components/LinkButton";
import CardContainer from "@components/article/CardContainer";
import Comment from "@components/article/Comment";
import LikeToggleButton from "@components/article/LikeToggleButton";
import useUserInfo from "@hooks/useUserInfo";
import { deleteArticle, getArticle } from "@lib/api/articleApi";
import { formatDate } from "@lib/dateFormatter";
import { ArticleType } from "@lib/types/articleType";
import deleteIcon from "@icons/ic_delete.svg";
import editIcon from "@icons/ic_edit.svg";

const ArticlePage = () => {
  const router = useRouter();
  const { boardId } = router.query;
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user } = useUserInfo();

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

  const isAuthor = article.writer.id === user?.id;

  return (
    <div className="flex flex-col items-center px-[20px] pb-[46px] md:px-[60px]">
      {boardId && typeof boardId === "string" && (
        <CardContainer className="mt-[20px] flex-col py-[20px] md:mt-[40px] md:py-[40px] lg:mt-[60px]">
          <div className="mb-[14px] flex w-full items-center justify-between md:mb-[30px]">
            <h1 className="text-[24px] font-semibold md:text-[32px]">
              {article.title}
            </h1>
            {isAuthor && (
              <div>
                <div className="flex gap-3.5 md:hidden">
                  <Image
                    src={editIcon}
                    alt="수정 아이콘"
                    width={25}
                    onClick={handleEditArticle}
                    className="cursor-pointer"
                  />
                  <Image
                    src={deleteIcon}
                    alt="삭제 아이콘"
                    width={25}
                    onClick={handleDeleteArticle}
                    className="cursor-pointer"
                  />
                </div>
                <div className="hidden gap-3.5 md:block">
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
                    className="ml-[14px] h-[45px] w-[140px] transition-all duration-500 hover:bg-green300"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="mb-[15px] flex w-full justify-between border-b border-solid border-gray-200 pb-[10px] md:mb-[30px] lg:mb-[38px]">
            <div className="flex gap-2.5 text-[12px] text-gray400 md:text-[14px]">
              <p>{article.writer.name}</p>
              <p>{formatDate(new Date(article.createdAt))}</p>
            </div>
            {boardId && typeof boardId === "string" && (
              <LikeToggleButton
                targetId={boardId}
                initialLiked={article.isLiked}
                initialLikeCount={article.likeCount}
              />
            )}
          </div>
          {article.image && (
            <Image
              src={article.image}
              alt="게시글 이미지"
              width={800}
              height={600}
            />
          )}
          <p className="mt-[15px] text-[14px] leading-relaxed md:mt-[20px] md:text-[16px]">
            {article.content}
          </p>
        </CardContainer>
      )}
      <LinkButton
        text="목록으로"
        link="/boards"
        color="white"
        className="my-[40px] h-[45px] w-[140px] border-[1px] border-solid border-green200 text-green200 transition-all duration-500 hover:bg-green-50 hover:text-green300 lg:my-[60px]"
      />
      {boardId && typeof boardId === "string" && <Comment boardId={boardId} />}
    </div>
  );
};

export default ArticlePage;
