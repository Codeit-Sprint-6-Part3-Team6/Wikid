import Link from "next/link";
import { ArticleType } from "@lib/types/articleType";

interface ArticleListProps {
  items: ArticleType[];
  totalCount: number;
}

const ArticleList = ({ items, totalCount }: ArticleListProps) => {
  const classBoardBox =
    "relative flex h-[50px] border-b border-solid border-gray200 pr-[40%] items-center";
  const classBoardInfo =
    "absolute top-0 right-0 flex w-2/5 justify-around h-[50px] items-center";
  const classBoardText = "text-center";

  return (
    <ul className="mt-[20px] text-[16px]">
      <li className={`${classBoardBox} border-t text-gray400`}>
        <p className={`${classBoardText} w-[15%]`}>번호</p>
        <p className={`${classBoardText} w-[85%]`}>제목</p>
        <div className={classBoardInfo}>
          <p className={`${classBoardText} w-[30%]`}>작성자</p>
          <p className={`${classBoardText} w-[30%]`}>좋아요</p>
          <p className={`${classBoardText} w-[40%]`}>날짜</p>
        </div>
      </li>

      {items?.map((article, index) => {
        const articleDate = article.createdAt.split("T")[0];
        return (
          <li key={article.id}>
            <Link
              href={`/boards/${article.id}`}
              className={`${classBoardBox} duration-500 ease-in-out hover:bg-gray-50`}
            >
              <p className={`${classBoardText} w-[15%]`}>{totalCount - index}</p>
              <p className={`${classBoardText} w-[85%]`}>{article.title}</p>
              <div className={classBoardInfo}>
                <p className={`${classBoardText} w-[30%]`}>
                  {article.writer.name}
                </p>
                <p className={`${classBoardText} w-[30%]`}>
                  {article.likeCount}
                </p>
                <p className={`${classBoardText} w-[40%]`}>{articleDate}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ArticleList;
