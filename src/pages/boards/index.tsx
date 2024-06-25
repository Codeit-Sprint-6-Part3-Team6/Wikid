import Dropdown from "@components/Dropdown";

const ArticleListPage: React.FC = () => {
  return <Dropdown options={["최신순", "좋아요순", "댓글순", "조회순"]} />;
};

export default ArticleListPage;
