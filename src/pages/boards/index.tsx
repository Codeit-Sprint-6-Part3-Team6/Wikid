import LinkButton from "@components/LinkButton";
import ArticleListBox from "@components/boards/ArticleListBox";
import BestArticleList from "@components/boards/BestArticleList";

const ArticleListPage = () => {
  return (
    <main className="wrapper">
      <div className="inner pb-[120px] pt-[80px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[32px] font-semibold">베스트 게시글</h2>
          <LinkButton
            text="게시물 등록하기"
            color="green"
            link="/addboard"
            className="h-[45px] w-[160px] transition-all duration-500 hover:bg-green300"
          />
        </div>
        <BestArticleList />
        <ArticleListBox />
      </div>
    </main>
  );
};

export default ArticleListPage;
