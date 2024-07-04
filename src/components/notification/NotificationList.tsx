import { useEffect, useRef } from "react";
import NotificationContainer from "./NotificationContainer";
import NotificationItem from "./NotificationItem";
import useModal from "@hooks/useModal";
import useNotificationList from "@hooks/useNotificationList";

type NotificationListProps = {
  isOpen: boolean;
  handleIsOpen: () => {};
};

export default function NotificationList({
  isOpen,
  handleIsOpen,
}: NotificationListProps) {
  const { notificationList, totalCount, handleDeleteClick } =
    useNotificationList();

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
