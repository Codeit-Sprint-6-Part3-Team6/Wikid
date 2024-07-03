import { Profile } from "./Profile";
import { ArticleType } from "./articleType";

export type ProfileList = {
  totalCount: number;
  list: Profile[];
};
export type ProfilePagination = {
  page: number;
  pageSize: number;
};

export type ArticleList = {
  totalCount: number;
  list: ArticleType[];
};

export type ArticlePagination = {
  page: number;
  pageSize: number;
  orderBy: string;
};
