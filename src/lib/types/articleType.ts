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
