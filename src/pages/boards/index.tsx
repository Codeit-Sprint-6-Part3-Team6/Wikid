import { useRouter } from "next/router";
import Button from "@components/Button";
import ArticleListBox from "@components/boards/ArticleListBox";
import BestArticleList from "@components/boards/BestArticleList";
import useAuth from "@hooks/useAuth";

const ArticleListPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const handlePostButtonClick = () => {
    if (!isLoggedIn) {
      const confirmed = window.confirm(
        "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?",
      );
      if (confirmed) {
        router.push("/login");
      }
    } else {
      router.push("/addboard");
    }
  };

  return (
    <main className="wrapper">
      <div className="inner pb-[120px] pt-[80px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[32px] font-semibold">베스트 게시글</h2>
          <Button
            text="게시글 등록하기"
            type="button"
            onClick={handlePostButtonClick}
            color="green"
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
