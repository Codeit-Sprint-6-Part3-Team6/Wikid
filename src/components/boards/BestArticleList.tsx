import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { getArticleList } from "@lib/api/articleApi";
import { ArticlePagination } from "@lib/types/Pagination";
import { ArticleType } from "@lib/types/articleType";

const PAGE_SIZE = 4;

const BestArticleList = () => {
  const [items, setItems] = useState<ArticleType[]>([]);

  const handleLoad = async (options: ArticlePagination) => {
    try {
      const { list } = await getArticleList(options);
      setItems(list);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLoad({ page: 1, pageSize: PAGE_SIZE, orderBy: "like" });
  }, []);

  return (
    <div className="m-[60px_0]">
      <ArticleCard items={items} />
    </div>
  );
};

export default BestArticleList;
