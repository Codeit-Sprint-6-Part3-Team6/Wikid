export interface ArticleType {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    name: string;
  };
  content: string;
  likeCount: number;
  isLiked: boolean;
}

export type ArticleList = {
  totalCount: number;
  list: ArticleType[];
};

export type ArticleQueryOptions = {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
};

export type PostArticleProps = {
  title: string;
  image: string;
  content: string;
};

export type PatchArticleProps = {
  id?: string | string[];
  title: string;
  image: string;
  content: string;
};
