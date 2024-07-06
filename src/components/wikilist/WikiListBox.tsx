import { useEffect, useState } from "react";
import Input from "@components/Input";
import Loading from "@components/Loading";
import NoResult from "@components/NoResult";
import PaginationBar from "@components/PaginationBar";
import UserWikiList from "./UserWikiList";
import usePagination from "@hooks/usePagination";
import { getProfileList } from "@lib/api/profileApi";
import { Profile, ProfileQueryOptions } from "@lib/types/Profile";

const PAGE_SIZE = 3;

const WikiListBox = () => {
  const [items, setItems] = useState<Profile[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentPage, handleGoPage, handlePrevPage, handleNextPage } =
    usePagination({
      initialPage: 1,
      totalPage,
    });

  const handleLoad = async (options: ProfileQueryOptions) => {
    setIsLoading(true);
    try {
      const { list, totalCount } = await getProfileList(options);
      setItems(list);
      setTotalPage(Math.ceil(totalCount / PAGE_SIZE));
      setTotalCount(totalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const delay = 300;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      const name = e.target.value;
      setSearch(name);
      handleLoad({ page: 1, pageSize: PAGE_SIZE, name });
    }, delay);
  };

  useEffect(() => {
    handleLoad({ page: currentPage, pageSize: PAGE_SIZE, name: search });
  }, [currentPage, search]);

  return (
    <>
      <div className="mb-[30px] md:mb-[60px]">
        <Input
          value={search}
          onChange={handleSearchChange}
          type="search"
          placeholder="이름을 입력해 주세요."
        />
        {search.length !== 0 && (
          <div className="mt-[16px] text-gray400">
            &quot;{search}&quot;님을 총
            <span className="text-green300"> {totalCount}</span>명 찾았습니다.
          </div>
        )}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {items.length > 0 ? (
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
          ) : (
            <NoResult item={search} />
          )}
        </>
      )}
    </>
  );
};

export default WikiListBox;
