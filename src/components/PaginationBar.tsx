import nextIcon from "@icons/ic_next.svg";
import prevIcon from "@icons/ic_prev.svg";

interface PaginationProps {
  currentPage: number; //현재 페이지
  totalPages: number; //전체 페이지
  onClick: (page: number) => void;
}

const PaginationBar: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onClick,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onClick(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onClick(currentPage + 1);
    }
  };

  const PaginationButton = () => {
    //number 타입은 map 함수를 지원하지 않아서 array 생성자를 사용하여 새로운 배열로 만듦
    return [...Array(totalPages)].map((_, i) => (
      <button
        type="button"
        key={i + 1}
        onClick={() => onClick(i + 1)}
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
        <img src={prevIcon} alt="이전" />
      </button>
      {PaginationButton()}
      <button
        type="button"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <img src={nextIcon} alt="다음" />
      </button>
    </div>
  );
};

export default PaginationBar;
