<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@components/Button";
import CardContainer from "@components/CardContainer";
import LinkButton from "@components/LinkButton";
=======
import { useState } from "react";
import Link from "next/link";
>>>>>>> 6abe365dca9f402540789111b52743407baec5c3
import TextEditor from "@components/TextEditor";
import { formatDate } from "@utils/dateFormatter";
import { inputCounter } from "@utils/inputCounter";
import { postArticle, editArticle } from "@lib/api/articleApi";

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

  const handleUpdateArticle = async () => {
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
      } catch (error) {
        console.error("게시글 수정 실패", error);
        alert("게시글 수정에 실패했습니다.");
      }
    } else {
      try {
        await postArticle(titleContent, imageContent, articleContent);
        alert("게시글이 등록되었습니다.");
        router.push("/boards");
      } catch (error) {
        console.error("게시글 등록 실패", error);
        alert("게시글 등록에 실패했습니다.");
      }
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col items-center">
      <CardContainer className="mb-[23px] mt-[54px] flex flex-col items-center">
        <div className="mt-[46px] flex w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">
            {id ? "게시물 수정하기" : "게시물 등록하기"}
          </h1>
          <Button
            type="button"
            color="green"
            text={id ? "수정하기" : "등록하기"}
            onClick={handleUpdateArticle}
            className="h-[45px] w-[140px] transition-all duration-500 hover:bg-green300"
          />
        </div>
        <div className="w-full">
          <div className="mt-[24px] flex gap-2.5 text-gray400">
            <p>등록일 </p>
            <p>{formatDate(new Date())}</p>
          </div>
        </div>
        <div className="mb-[20px] mt-[33px] flex w-full items-center justify-between border-b border-t border-solid border-gray-300">
          <input
            type="text"
            value={titleContent}
            onChange={handleInputCount}
            placeholder="제목을 입력해주세요"
            maxLength={30}
            className="h-auto w-full py-[14px] text-[20px]"
          />
          <p>
            <span>{inputCount}/</span>
            <span className="text-green200">30</span>
          </p>
        </div>
        <div className="mb-[10px] w-full text-[16px]">
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
        className="mb-[32px] h-[45px] w-[140px] text-green200 ring-2 ring-green200 transition-all duration-500 hover:bg-green-50 hover:text-green300"
      />
=======
    <div>
      <Link href="/wiki/726f196f-b9e0-42ab-ba9c-4305aac71719">링크</Link>
      <TextEditor type="article" content={content} onChange={handleChange} />
>>>>>>> 6abe365dca9f402540789111b52743407baec5c3
    </div>
  );
}

export default ArticleEditPage;
