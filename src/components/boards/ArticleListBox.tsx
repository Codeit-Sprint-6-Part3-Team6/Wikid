import { useEffect, useState } from "react";
import Button from "@components/Button";
import Dropdown from "@components/Dropdown";
import Input from "@components/Input";
import PaginationBar from "@components/PaginationBar";
import ArticleList from "./ArticleList";
import usePagination from "@hooks/usePagination";
import { getArticleList } from "@lib/api/articleApi";
import { ArticlePagination } from "@lib/types/Pagination";
import { ArticleType } from "@lib/types/articleType";

const PAGE_SIZE = 10;

const ArticleListBox = () => {
  const [orderBy, setOrderBy] = useState<string>("recent");
  const [items, setItems] = useState<ArticleType[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);

  const { currentPage, handleGoPage, handlePrevPage, handleNextPage } =
    usePagination({
      initialPage: 1,
      totalPage,
    });

  const handleLoad = async (options: ArticlePagination) => {
    try {
      const { list, totalCount } = await getArticleList(options);
      setItems(list);
      setTotalPage(Math.ceil(totalCount / PAGE_SIZE));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLoad({ page: currentPage, pageSize: PAGE_SIZE, orderBy });
  }, [currentPage, orderBy]);

  return (
    <>
      <div className="flex">
        <Input type="search" />
        <Button text="검색" color="green" type="button" className="type6" />
        <Dropdown
          options={["최신순", "좋아요순"]}
          order={["recent", "like"]}
          type="sort"
          onClick={(option) => {
            setOrderBy(option);
          }}
        />
      </div>
      <ArticleList items={items} />
      <PaginationBar
        currentPage={currentPage}
        totalPage={totalPage}
        handleGoPage={handleGoPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </>
  );
};

export default ArticleListBox;
