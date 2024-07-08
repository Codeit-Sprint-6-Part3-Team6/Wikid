import { useEffect, useState } from "react";
import {
  deleteNotifications,
  getNotifications,
} from "@lib/api/notificationListApi";
import { NotificationItemType } from "@lib/types/Notifications";

export const useNotificationList = (isOpen: boolean) => {
  const [notificationList, setNotificationList] = useState<
    NotificationItemType[]
  >([]);
  const totalCount = notificationList?.length;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { list } = await getNotifications();
        setNotificationList(list);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [isOpen]);

  const handleDeleteClick = async (id: number) => {
    await deleteNotifications(id);
    setNotificationList((prevList) => {
      return prevList.filter((item) => item.id !== id);
    });
  };

  return { totalCount, notificationList, handleDeleteClick, isLoading };
};

export default useNotificationList;
