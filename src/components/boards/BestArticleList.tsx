import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { getArticleList } from "@lib/api/articleApi";
import { ArticleType, ArticleQueryOptions } from "@lib/types/articleType";

interface BestArticleListProps {
  bestArticles: ArticleType[];
}

const BestArticleList = ({ bestArticles }: BestArticleListProps) => {
  return (
    <div className="m-[60px_0]">
      <ArticleCard items={bestArticles} />
    </div>
  );
};

export default BestArticleList;
