import axios from "@lib/api/axios";
import { NotificationListType } from "@lib/types/Notifications";

export const getNotifications = async () => {
  const res = await axios.get<NotificationListType>(`notifications?page=1&pageSize=5`);
  const data = res.data
  return data;
};

export const deleteNotifications = async (id: number) => {
  const res = await axios.delete(`notifications/${id}`);
};
