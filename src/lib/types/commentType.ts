export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    name: string;
    image: string | null;
  };
}
