import { useEffect, useState } from "react";
import Button from "@components/Button";
import Dropdown from "@components/Dropdown";
import Input from "@components/Input";
import Loading from "@components/Loading";
import NoResult from "@components/NoResult";
import PaginationBar from "@components/PaginationBar";
import ArticleList from "./ArticleList";
import usePagination from "@hooks/usePagination";
import { getArticleList } from "@lib/api/articleApi";
import { ArticleType, ArticleQueryOptions } from "@lib/types/articleType";

const PAGE_SIZE = 10;

const ArticleListBox = () => {
  const [orderBy, setOrderBy] = useState<string>("recent");
  const [items, setItems] = useState<ArticleType[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searching, setSearching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentPage, handleGoPage, handlePrevPage, handleNextPage } =
    usePagination({
      initialPage: 1,
      totalPage,
    });

  const handleLoad = async (options: ArticleQueryOptions) => {
    setIsLoading(true);
    try {
      const { list, totalCount } = await getArticleList(options);
      setItems(list);
      setTotalPage(Math.ceil(totalCount / PAGE_SIZE));
      setTotalCount(totalCount);
      if (searching) {
        setSearching(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSearching(true);
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearching(false);
    handleLoad({
      page: 1,
      pageSize: PAGE_SIZE,
      orderBy,
      keyword: search,
    });
  };

  const handleOrderChange = (option: string) => {
    setOrderBy(option);
    setSearching(false);
  };

  useEffect(() => {
    if (!searching) {
      handleLoad({
        page: currentPage,
        pageSize: PAGE_SIZE,
        orderBy,
        keyword: search,
      });
    }
  }, [currentPage, orderBy, search, searching]);

  //첫번째 인덱스값 = (해당 페이지 번호 - 1) * 페이지당 표시할 게시물 수
  const firstIndex = (currentPage - 1) * PAGE_SIZE;

  return (
    <>
      <div className="flex gap-[20px]">
        <form onSubmit={handleSearchSubmit} className="flex w-full gap-[20px]">
          <Input
            value={search}
            onChange={handleSearchChange}
            type="search"
            placeholder="제목을 검색해 주세요."
          />
          <Button
            text="검색"
            color="green"
            type="submit"
            className="h-[45px] w-[80px] shrink-0"
          />
        </form>
        <Dropdown
          options={["최신순", "좋아요순"]}
          order={["recent", "like"]}
          type="sort"
          onClick={handleOrderChange}
        />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {items.length > 0 ? (
            <>
              <ArticleList
                items={items}
                totalCount={totalCount}
                firstIndex={firstIndex}
              />
              <PaginationBar
                currentPage={currentPage}
                totalPage={totalPage}
                handleGoPage={handleGoPage}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />
            </>
          ) : (
            <NoResult item={search} />
          )}
        </>
      )}
    </>
  );
};

export default ArticleListBox;
