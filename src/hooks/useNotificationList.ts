import { useEffect, useState } from "react";
import {
  deleteNotifications,
  getNotifications,
} from "@lib/api/notificationListApi";
import { NotificationItemType } from "@lib/types/Notifications";

export const useNotificationList = () => {
  const [notificationList, setNotificationList] = useState<
    NotificationItemType[] | null
  >(null);
  const totalCount = notificationList?.length;

  useEffect(() => {
    async function fetchData() {
      const { list } = await getNotifications();
      setNotificationList(list);
    }
    fetchData();
  }, [notificationList]);

  const handleDeleteClick = (id: number) => {
    deleteNotifications(id);
  };

  return { totalCount, notificationList, handleDeleteClick };
};

export default useNotificationList;
