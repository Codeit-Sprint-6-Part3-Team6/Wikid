import { useEffect } from "react";
import NotificationContainer from "./NotificationContainer";
import NotificationItem from "./NotificationItem";
import useNotificationList from "@hooks/useNotificationList";

type NotificationListProps = {
  isOpen: boolean;
  handleIsOpen: () => {};
  handleIsNotification: () => {};
  getCountOfBookmarks: () => {};
};

export default function NotificationList({
  isOpen,
  handleIsOpen,
  handleIsNotification,
  getCountOfBookmarks,
}: NotificationListProps) {
  const { notificationList, totalCount, handleDeleteClick } =
    useNotificationList();

  useEffect(() => {
    handleIsNotification(notificationList);
    getCountOfBookmarks(totalCount);
  }, [notificationList]);

  return (
    <>
      {isOpen && (
        <NotificationContainer totalCount={totalCount} onClick={handleIsOpen}>
          {notificationList
            ? notificationList.map((item) => (
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
