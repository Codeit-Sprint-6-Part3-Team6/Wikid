import { Profile } from "./Profile";
import { ArticleType } from "./articleType";

export type Pagination = {
  page: number;
  pageSize: number;
};

export type ProfileList = {
  totalCount: number;
  list: Profile[];
};

export type ArticleList = {
  totalCount: number;
  list: ArticleType[];
};

// 페이지네이션 관련된 타입들을 따로 빼주긴 했는데.. 생각해보니 사용 용도가 없는듯..?
