import { useRouter } from "next/router";
import Button from "@components/Button";
import ArticleListBox from "@components/boards/ArticleListBox";
import BestArticleList from "@components/boards/BestArticleList";

const ArticleListPage = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/addboard");
  };

  return (
    <main className="wrapper">
      <div className="inner pb-[120px] pt-[80px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[32px] font-semibold">베스트 게시글</h2>
          <Button
            text="게시물 등록하기"
            color="green"
            type="button"
            className="h-[45px] w-[160px]"
            onClick={handleButtonClick}
          />
        </div>
        <BestArticleList />
        <ArticleListBox />
      </div>
    </main>
  );
};

export default ArticleListPage;
