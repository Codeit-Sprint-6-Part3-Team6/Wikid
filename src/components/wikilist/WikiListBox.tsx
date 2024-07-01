import { useEffect, useState } from "react";
import PaginationBar from "@components/PaginationBar";
import UserWikiList from "./UserWikiList";
import usePagination from "@hooks/usePagination";
import { getProfileList } from "@lib/api/profileApi";
import { Profile } from "@lib/types/Profile";

const PAGE_SIZE = 3;

const WikiListBox = () => {
  const [items, setItems] = useState<Profile[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);

  const { currentPage, handleGoPage, handlePrevPage, handleNextPage } =
    usePagination({
      initialPage: 1,
      totalPage,
    });

  const handleLoad = async (options: { page: number; pageSize: number }) => {
    try {
      const { list, totalCount } = await getProfileList(options);
      setItems(list);
      setTotalPage(Math.ceil(totalCount / PAGE_SIZE));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLoad({ page: currentPage, pageSize: PAGE_SIZE });
  }, [currentPage]);

  return (
    <>
      <UserWikiList items={items} />
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

export default WikiListBox;
