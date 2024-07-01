import Button from "@components/Button";
import Dropdown from "@components/Dropdown";
import Input from "@components/Input";
import PaginationBar from "@components/PaginationBar";
import ArticleList from "@components/boards/ArticleList";
import BestArticleList from "@components/boards/BestArticleList";

const ArticleListPage = () => {
  return (
    <main className="wrapper">
      <div className="inner">
        <div className="flex justify-between">
          <h2 className="">베스트 게시글</h2>
          <Button
            text="게시물 등록하기"
            color="green"
            type="button"
            className="type3"
          />
        </div>
        <BestArticleList />
        <div className="flex">
          <Input type="search" />
          <Button text="검색" color="green" type="button" className="type6" />
          <Dropdown
            options={["최신순", "좋아요순", "댓글순", "조회순"]}
            type="sort"
            onClick={(option) => {
              // 테스트용 로직이에요. 개발하실 때 옵션 클릭 시 실행될 로직을 정의한 함수를 만들고 props로 내려주세요.
              console.log(`Selected Option: ${option}`);
            }}
          />
        </div>
        <ArticleList />
        <PaginationBar currentPage={1} totalPage={10} />
      </div>
    </main>
  );
};

export default ArticleListPage;
