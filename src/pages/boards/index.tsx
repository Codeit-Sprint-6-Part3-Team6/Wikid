import { useRouter } from "next/router";
import Button from "@components/Button";
import ArticleListBox from "@components/boards/ArticleListBox";
import BestArticleList from "@components/boards/BestArticleList";
import { useAuth } from "@context/AuthContext";
import { getArticleList } from "@lib/api/articleApi";
import { ArticleType, ArticleQueryOptions } from "@lib/types/articleType";

const PAGE_SIZE = 4;

interface ArticleListPageProps {
  bestArticles: ArticleType[];
}

export async function getServerSideProps() {
  try {
    const options: ArticleQueryOptions = {
      page: 1,
      pageSize: PAGE_SIZE,
      orderBy: "like",
    };
    const { list } = await getArticleList(options);

    return {
      props: {
        bestArticles: list,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        bestArticles: [],
      },
    };
  }
}

const ArticleListPage = ({ bestArticles }: ArticleListPageProps) => {
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
            className="h-[45px] w-[160px]"
          />
        </div>
        <BestArticleList bestArticles={bestArticles} />
        <ArticleListBox />
      </div>
    </main>
  );
};

export default ArticleListPage;
