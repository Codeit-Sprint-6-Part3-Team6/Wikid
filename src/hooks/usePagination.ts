import { useState } from "react";

interface usePaginationProps {
  initialPage: number;
  totalPage: number;
}

const usePagination = ({ initialPage, totalPage }: usePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleGoPage = (pageNumber: number) => {
    if (pageNumber) {
      setCurrentPage(pageNumber);
      console.log(currentPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log("handlePrevPage");
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      console.log("handleNextPage");
    }
  };

  return {
    currentPage,
    handleGoPage,
    handlePrevPage,
    handleNextPage,
  };
};

export default usePagination;
