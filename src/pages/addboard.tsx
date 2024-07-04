import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@components/Button";
import LinkButton from "@components/LinkButton";
import TextEditor from "@components/TextEditor";
import CardContainer from "@components/article/CardContainer";
import { postArticle, editArticle } from "@lib/api/articleApi";
import { formatDate } from "@lib/dateFormatter";
import { inputCounter } from "@lib/inputCounter";

function ArticleEditPage() {
  const router = useRouter();
  const { id, title, image, content } = router.query;

  const [inputCount, setInputCount] = useState(0);
  const [titleContent, setTitleContent] = useState((title as string) || "");
  const [articleContent, setArticleContent] = useState(
    (content as string) || "",
  );
  const [imageContent, setImageContent] = useState((image as string) || "");

  useEffect(() => {
    setInputCount(titleContent.length);
  }, [titleContent]);

  const handleInputCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputCounter(e, setInputCount, setTitleContent);
  };

  const handleChange = (value: string) => {
    setArticleContent(value);
  };

  const handlePostArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postArticle(titleContent, imageContent, articleContent);
      alert("게시글이 등록되었습니다.");
      router.push("/boards");
    } catch (err) {
      console.error("게시글 등록 실패", err);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  const handleEditArticle = async () => {
    if (id) {
      try {
        await editArticle(
          id as string,
          titleContent,
          imageContent,
          articleContent,
        );
        alert("게시글이 수정되었습니다.");
        router.push(`/boards/${id}`);
      } catch (err) {
        console.error("게시글 수정 실패", err);
        alert("게시글 수정에 실패했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center px-[20px] pb-[46px] md:px-[60px]">
      <CardContainer className="mt-[20px] flex flex-col items-center pt-[20px] md:mt-[40px] md:pt-[40px] lg:mt-[60px]">
        <div className="mb-[16px] flex w-full items-center justify-between md:mb-[24px]">
          <h1 className="text-[24px] font-semibold md:text-[32px]">
            {id ? "게시글 수정하기" : "게시글 등록하기"}
          </h1>
          <Button
            type="button"
            color="green"
            text={id ? "수정하기" : "등록하기"}
            onClick={id ? handleEditArticle : handlePostArticle}
            className="h-[45px] w-[140px] transition-all duration-500 hover:bg-green300"
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
            value={titleContent}
            onChange={handleInputCount}
            placeholder="제목을 입력해주세요"
            maxLength={30}
            className="h-auto w-full py-[12px] text-[16px] md:text-[20px]"
          />
          <p>
            <span>{inputCount}/</span>
            <span className="text-green200">30</span>
          </p>
        </div>
        <div className="mb-[10px] w-full text-[14px] md:text-[16px]">
          <p>
            공백포함: 총 {articleContent.length}자 | 공백제외: 총{" "}
            {articleContent.replace(/\s/g, "").length}자
          </p>
        </div>
        <TextEditor
          type="article"
          content={articleContent}
          onChange={handleChange}
        />
      </CardContainer>
      <LinkButton
        text="목록으로"
        link="/boards"
        color="white"
        className="my-[40px] h-[45px] w-[140px] border-[1px] border-solid border-green200 text-green200 transition-all duration-500 hover:bg-green-50 hover:text-green300 lg:my-[60px]"
      />
    </div>
  );
}

export default ArticleEditPage;
