import { useEffect } from "react";
import NotificationContainer from "./NotificationContainer";
import NotificationItem from "./NotificationItem";
import useNotificationList from "@hooks/useNotificationList";
import { NotificationItemType } from "@lib/types/Notifications";

type NotificationListProps = {
  isOpen: boolean;
  handleIsOpen: () => {};
  getCountOfBookmarks: (count: number) => {};
};

export default function NotificationList({
  isOpen,
  handleIsOpen,
  getCountOfBookmarks,
}: NotificationListProps) {
  const { notificationList, totalCount, handleDeleteClick } =
    useNotificationList();

  useEffect(() => {
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
