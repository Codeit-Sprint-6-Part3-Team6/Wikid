export type Notifications = {
  list: Notification[];
  totalCount: number;
};

export type Notification = {
  createdAt: string;
  content: string;
  id: number;
};
