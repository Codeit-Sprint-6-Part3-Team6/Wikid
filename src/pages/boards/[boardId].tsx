import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "@components/Button";
import LinkButton from "@components/LinkButton";
import Loading from "@components/Loading";
import CardContainer from "@components/article/CardContainer";
import Comment from "@components/article/Comment";
import LikeToggleButton from "@components/article/LikeToggleButton";
import useApiRequest from "@hooks/useApiRequest";
import { useAuth } from "@context/AuthContext";
import { deleteArticle, getArticle } from "@lib/api/articleApi";
import { formatDate } from "@lib/dateFormatter";
import { ArticleType } from "@lib/types/articleType";
import deleteIcon from "@icons/ic_delete.svg";
import editIcon from "@icons/ic_edit.svg";

const ArticlePage = () => {
  const router = useRouter();
  const { boardId } = router.query;
  const { data: article } = useApiRequest<
    (targetId: string | string[]) => Promise<ArticleType>,
    ArticleType,
    string | string[]
  >(getArticle, boardId, true);
  const { user } = useAuth();

  const handleEditArticle = () => {
    if (article) {
      router.push({
        pathname: "/addboard",
        query: {
          boardId,
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

  if (!article) {
    return <Loading />;
  }

  const isAuthor = article.writer.id === user?.id;

  return (
    <div className="flex flex-col items-center px-[20px] pb-[46px] md:px-[60px]">
      {boardId && typeof boardId === "string" && (
        <CardContainer className="mt-[20px] flex-col py-[20px] md:mt-[40px] md:py-[40px] lg:mt-[60px]">
          <div className="mb-[14px] flex w-full items-center justify-between md:mb-[30px]">
            <h1 className="text-[24px] font-semibold md:text-[32px]">{article.title}</h1>
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
                    className="h-[45px] w-[140px]"
                  />
                  <Button
                    text="삭제하기"
                    color="green"
                    type="button"
                    onClick={handleDeleteArticle}
                    className="ml-[14px] h-[45px] w-[140px]"
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
            <img
              src={article.image}
              alt="게시글 이미지"
              className="max-h-[40vh] self-start object-contain"
            />
          )}
          <p
            className="mt-[15px] text-[14px] leading-relaxed md:mt-[20px] md:text-[16px]"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.content),
            }}
          />
        </CardContainer>
      )}
      <LinkButton
        text="목록으로"
        link="/boards"
        color="white"
        className="my-[40px] h-[45px] w-[140px] border-[1px] border-solid border-green200 text-green200 transition-all duration-500 hover:bg-gray50 lg:my-[60px]"
      />
      {boardId && typeof boardId === "string" && <Comment boardId={boardId} />}
    </div>
  );
};

export default ArticlePage;
