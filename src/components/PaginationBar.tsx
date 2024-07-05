import { useState } from "react";
import Image from "next/image";
import nextIcon from "@icons/ic_next.svg";
import prevIcon from "@icons/ic_prev.svg";

interface PaginationProps {
  currentPage: number; //현재 페이지
  totalPage: number; //전체 페이지
  handleGoPage: (pageNumber: number) => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

const PaginationBar = ({
  currentPage,
  totalPage,
  handleGoPage,
  handlePrevPage,
  handleNextPage,
}: PaginationProps) => {
  const commonClass =
    "flex h-[40px] w-[40px] md:h-[45px] md:w-[45px] items-center justify-center rounded-[10px] shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] duration-300 ease-in-out";

  const getPageNumbers = () => {
    const totalVisible = 5; // 최대 보이는 페이지 번호 수
    const currentGroup = Math.ceil(currentPage / totalVisible); // 현재 페이지가 속한 그룹 계산
    const startPage = (currentGroup - 1) * totalVisible + 1; // 그룹의 시작 페이지 번호 계산
    const endPage = Math.min(startPage + totalVisible - 1, totalPage); // 그룹의 끝 페이지 번호 계산

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const PaginationButton = () => {
    const pages = getPageNumbers();
    return pages.map((pageNumber) => (
      <button
        type="button"
        key={pageNumber}
        onClick={() => handleGoPage(pageNumber)}
        className={`${commonClass} ${
          pageNumber === currentPage
            ? "font-semibold text-green200"
            : "text-gray400"
        } hover:text-green200`}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div className="mt-[80px] flex justify-center gap-[7px] md:gap-[15px]">
      <button
        type="button"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={commonClass}
      >
        <Image
          src={prevIcon}
          alt="이전"
          className={`${currentPage === 1 && "opacity-50"}`}
        />
      </button>
      <PaginationButton />
      <button
        type="button"
        onClick={handleNextPage}
        disabled={currentPage === totalPage}
        className={commonClass}
      >
        <Image
          src={nextIcon}
          alt="다음"
          className={`${currentPage === totalPage && "opacity-50"}`}
        />
      </button>
    </div>
  );
};

export default PaginationBar;
