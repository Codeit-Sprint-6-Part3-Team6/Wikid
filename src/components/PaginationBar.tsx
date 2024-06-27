import Image from "next/image";
import usePagination from "@hooks/usePagination";
import nextIcon from "@icons/ic_next.svg";
import prevIcon from "@icons/ic_prev.svg";

interface PaginationProps {
  currentPage: number; //현재 페이지
  totalPage: number; //전체 페이지
}

const PaginationBar = ({
  currentPage: initialPage,
  totalPage,
}: PaginationProps) => {
  const { currentPage, handleGoPage, handlePrevPage, handleNextPage } =
    usePagination({ initialPage, totalPage });

  const PaginationButton = () => {
    //number 타입은 map 함수를 지원하지 않아서 array 생성자를 사용하여 새로운 배열로 만듦
    return [...Array(totalPage)].map((_, i) => (
      <button
        type="button"
        key={i + 1}
        onClick={() => handleGoPage(i + 1)}
        className={`${i + 1 === currentPage ? "active" : ""}`}
      >
        {i + 1}
      </button>
    ));
  };

  return (
    <div>
      <button
        type="button"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <Image src={prevIcon} alt="이전" />
      </button>
      {PaginationButton()}
      <button
        type="button"
        onClick={handleNextPage}
        disabled={currentPage === totalPage}
      >
        <Image src={nextIcon} alt="다음" />
      </button>
    </div>
  );
};

export default PaginationBar;
