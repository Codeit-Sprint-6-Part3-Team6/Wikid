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
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    currentPage,
    totalPage,
    handleGoPage,
    handlePrevPage,
    handleNextPage,
  };
};

export default usePagination;
