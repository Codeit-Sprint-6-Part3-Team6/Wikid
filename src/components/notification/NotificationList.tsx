import { useEffect } from "react";
import NotificationContainer from "./NotificationContainer";
import NotificationItem from "./NotificationItem";
import useNotificationList from "@hooks/useNotificationList";
import { NotificationItemType } from "@lib/types/Notifications";

type NotificationListProps = {
  isOpen: boolean;
  handleIsOpen: () => {};
  notificationList: NotificationItemType[];
  totalCount: number;
  handleDeleteClick: () => {};
};

export default function NotificationList({
  isOpen,
  handleIsOpen,
  notificationList,
  totalCount,
  handleDeleteClick,
}: NotificationListProps) {
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
