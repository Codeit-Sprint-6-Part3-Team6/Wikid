import Dropdown from "@components/Dropdown";
import Input from "@components/Input";

const ArticleListPage: React.FC = () => {
  // 테스트용 코드입니다.
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Dropdown options={["최신순", "좋아요순", "댓글순", "조회순"]} />
      <Input type="search" />
    </div>
  );
};

export default ArticleListPage;
