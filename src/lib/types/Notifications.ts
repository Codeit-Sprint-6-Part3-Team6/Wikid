export type NotificationListType = {
  list: NotificationItemType[];
  totalCount: number;
};

export type NotificationItemType = {
  createdAt: string;
  content: string;
  id: number;
};
