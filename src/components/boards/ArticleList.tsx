import Image from "next/image";
import Link from "next/link";
import { ArticleType } from "@lib/types/articleType";
import heartIcon from "@icons/ic_heartEmpty.svg";

interface ArticleListProps {
  items: ArticleType[];
  totalCount: number;
  firstIndex: number;
}

const ArticleList = ({ items, totalCount, firstIndex }: ArticleListProps) => {
  const classBoardBox =
    "relative h-auto border-b border-solid border-gray200 items-center flex-col pr-0 md:flex-row md:pr-[40%] md:h-[50px]";
  const classBoardInfo =
    "relative w-full flex h-auto items-center gap-[15px] text-gray400 text-[14px] md:absolute md:w-2/5 md:justify-around md:gap-0 md:top-0 md:right-0 md:h-[50px] md:text-gray500 md:text-[16px]";
  const classBoardText = "md:text-center";

  return (
    <ul className="mt-[20px] text-[15px] md:text-[16px]">
      <li className={`${classBoardBox} hidden border-t text-gray400 md:flex`}>
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
        const indexNumber = totalCount - (firstIndex + index);
        return (
          <li key={article.id}>
            <Link
              href={`/boards/${article.id}`}
              className={`${classBoardBox} flex p-[12px_0] duration-500 ease-in-out hover:bg-gray-50 md:p-[0]`}
            >
              <p className={`${classBoardText} hidden w-[15%] md:block`}>
                {indexNumber}
              </p>
              <p className={`${classBoardText} w-full md:w-[85%]`}>
                {article.title}
              </p>
              <div className={classBoardInfo}>
                <p className={`${classBoardText} w-auto md:w-[30%]`}>
                  {article.writer.name}
                </p>
                <p
                  className={`${classBoardText} absolute right-0 flex w-auto items-center gap-[3px] md:static md:block md:w-[30%]`}
                >
                  <Image
                    src={heartIcon}
                    alt="좋아요 아이콘"
                    width={14}
                    height={12}
                    className="md:hidden"
                  />
                  {article.likeCount}
                </p>
                <p className={`${classBoardText} w-auto md:w-[40%]`}>
                  {articleDate}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ArticleList;
