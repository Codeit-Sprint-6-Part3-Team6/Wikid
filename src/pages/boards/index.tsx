import Dropdown from "@components/Dropdown";
import Input from "@components/Input";

const ArticleListPage = () => {
  // 테스트용 코드입니다.
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Dropdown
        options={["최신순", "좋아요순", "댓글순", "조회순"]}
        type="sort"
        onClick={(option) => {
          // 테스트용 로직이에요. 개발하실 때 옵션 클릭 시 실행될 로직을 정의한 함수를 만들고 props로 내려주세요.
          console.log(`Selected Option: ${option}`);
        }}
      />
      <Input type="search" />
    </div>
  );
};

export default ArticleListPage;
