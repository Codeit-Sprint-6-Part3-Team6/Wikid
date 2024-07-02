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

  const commonClass =
    "flex h-[45px] w-[45px] items-center justify-center rounded-[10px] shadow-[0_4px_20px_0_rgba(0,0,0,0.08)]";

  const PaginationButton = () => {
    //number 타입은 map 함수를 지원하지 않아서 array 생성자를 사용하여 새로운 배열로 만듦
    return [...Array(totalPage)].map((_, i) => (
      <button
        type="button"
        key={i + 1}
        onClick={() => handleGoPage(i + 1)}
        className={`${commonClass} ${i + 1 === currentPage ? "text-green200" : "text-gray400"}`}
      >
        {i + 1}
      </button>
    ));
  };

  return (
    <div className="mt-[80px] flex justify-center gap-[15px]">
      <button
        type="button"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={commonClass}
      >
        <Image src={prevIcon} alt="이전" />
      </button>
      {PaginationButton()}
      <button
        type="button"
        onClick={handleNextPage}
        disabled={currentPage === totalPage}
        className={commonClass}
      >
        <Image src={nextIcon} alt="다음" />
      </button>
    </div>
  );
};

export default PaginationBar;
