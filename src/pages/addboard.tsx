import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@components/Button";
import ImageUploadModal from "@components/ImageUploadModal";
import Loading from "@components/Loading";
import TextEditor from "@components/TextEditor";
import CardContainer from "@components/article/CardContainer";
import useApiRequest from "@hooks/useApiRequest";
import useModal from "@hooks/useModal";
import { postArticle, editArticle, getArticle } from "@lib/api/articleApi";
import { getImageUrl } from "@lib/api/imageApi";
import { formatDate } from "@lib/dateFormatter";
import { getImageFile } from "@lib/getImageFile";
import { ArticleType, PatchArticleProps, PostArticleProps } from "@lib/types/articleType";
import { validateImage } from "@lib/validateImage";

function ArticleEditPage() {
  const router = useRouter();
  const { boardId } = router.query;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [isOpen, handleIsOpen] = useModal();
  const editorRef = useRef<HTMLDivElement>(null);
  const postArticleOptions = useRef({ title, content, image }).current;
  const editArticleOptions = useRef({ title, content, image, id: boardId }).current;
  const { data: article } = useApiRequest<ArticleType, string | string[]>(
    getArticle,
    boardId,
    true,
  );
  const { toggleTrigger: togglePostTrigger } = useApiRequest<ArticleType, PostArticleProps>(
    postArticle,
    postArticleOptions,
    false,
    () => router.push("/boards"),
  );
  const { toggleTrigger: togglePatchTrigger } = useApiRequest<ArticleType, PatchArticleProps>(
    editArticle,
    editArticleOptions,
    false,
    () => router.push(`/boards/${boardId}`),
  );

  const handleContentChange = (value: string) => {
    //얘네 훅화
    setContent(value);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleImagePreview = (imageSrc: string) => {
    setImage(imageSrc);
    handleIsOpen();
  };

  const handlePostArticle = async (e: React.FormEvent) => {
    e.preventDefault();

    if (image) {
      const imageFile = await getImageFile(image);
      const imageUrl = (await getImageUrl(imageFile)).url;
      setImage(imageUrl);
    }

    togglePostTrigger();
  };

  const handleEditArticle = async () => {
    if (boardId) {
      if (image && validateImage(image) !== image) {
        const imageFile = await getImageFile(image);
        const imageUrl = (await getImageUrl(imageFile)).url;
        setImage(imageUrl);
      }

      togglePatchTrigger();
    }
  };

  const handleReturnButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (confirm("작성 중인 내용이 있습니다. 목록으로 이동하시겠습니까?")) {
      router.push("/boards");
    } else {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (article) {
      setContent(article.content);
      setTitle(article.title);
      setImage(article.image);
    }
  }, [article]);

  return (
    <>
      <div className="flex flex-col items-center px-[20px] pb-[46px] md:px-[60px]">
        <CardContainer className="mt-[20px] flex flex-col items-center pt-[20px] md:mt-[40px] md:pt-[40px] lg:mt-[60px]">
          <div className="mb-[16px] flex w-full items-center justify-between md:mb-[24px]">
            <h1 className="text-[24px] font-semibold md:text-[32px]">
              {boardId ? "게시글 수정하기" : "게시글 등록하기"}
            </h1>
            <Button
              text="목록으로"
              color="white"
              type="button"
              onClick={handleReturnButtonClick}
              className="h-10 w-[72px] border-[1px] border-solid border-green200 text-green200 transition-all duration-500 hover:bg-green-50 hover:text-green300 md:h-[45px] md:w-[140px]"
            />
          </div>
          <div className="w-full">
            <div className="flex gap-2.5 text-[12px] text-gray400 md:text-[14px]">
              <p>등록일 </p>
              <p>{formatDate(new Date())}</p>
            </div>
          </div>
          <div className="mb-[20px] mt-[20px] flex w-full items-center justify-between border-b border-t border-solid border-gray-300 md:mt-[25px] lg:mt-[33px]">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="제목을 입력해주세요"
              maxLength={30}
              className="h-auto w-full py-[12px] text-[16px] md:text-[20px]"
            />
            <p>
              <span>{title?.length}/</span>
              <span className="text-green200">30</span>
            </p>
          </div>
          <div className="mb-[20px] w-full text-[14px] md:text-[16px]">
            <p>
              총 {editorRef.current?.textContent?.length}자 | 공백제외 :{" "}
              {editorRef.current?.innerText.replace(/\s/g, "").length}자
            </p>
          </div>
          {image && (
            <img
              src={image}
              alt="게시글 사진"
              className="mb-[15px] max-h-[40vh] self-start object-contain md:mb-[20px]"
            />
          )}
          <TextEditor
            type="article"
            content={content}
            onChange={handleContentChange}
            onClick={handleIsOpen}
            className="relative h-[55lvh]"
            editorRef={editorRef}
          />
        </CardContainer>

        <Button
          type="button"
          color="green"
          text={boardId ? "수정하기" : "등록하기"}
          onClick={boardId ? handleEditArticle : handlePostArticle}
          className="my-[40px] h-[45px] w-[140px] transition-all duration-500 hover:bg-green300 lg:my-[60px]"
          disabled={!title || !content}
        />
      </div>
      <ImageUploadModal isOpen={isOpen} handleIsOpen={handleIsOpen} onClick={handleImagePreview} />
    </>
  );
}

export default ArticleEditPage;
