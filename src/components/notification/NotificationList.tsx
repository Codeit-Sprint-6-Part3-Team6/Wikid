import { useEffect, useState } from "react";
import NotificationContainer from "./NotificationContainer";
import NotificationItem from "./NotificationItem";
import useModal from "@hooks/useModal";
import {
  deleteNotifications,
  getNotifications,
} from "@lib/api/notificationsApi";
import { Notification } from "@lib/types/Notifications";

type NotificationListProps = {
  isOpen: boolean;
  handleIsOpen: () => {};
};

export default function NotificationList({
  isOpen,
  handleIsOpen,
}: NotificationListProps) {
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null,
  );
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { totalCount, list } = await getNotifications();
      setNotifications(list);
      setTotalCount(totalCount);
    }
    fetchData();
  }, [notifications]);

  const handleDeleteClick = (id: number) => {
    deleteNotifications(id);
  };

  return (
    <>
      {isOpen && (
        <NotificationContainer totalCount={totalCount} onClick={handleIsOpen}>
          {notifications
            ? notifications.map((item) => (
                <NotificationItem
                  key={item.id}
                  data={item}
                  onClick={handleDeleteClick}
                />
              ))
            : null}
        </NotificationContainer>
      )}
    </>
  );
}
