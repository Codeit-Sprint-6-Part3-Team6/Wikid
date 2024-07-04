import NotificationContainer from "./NotificationContainer";
import NotificationItem from "./NotificationItem";
import { NotificationItemType } from "@lib/types/Notifications";

type NotificationListProps = {
  isOpen: boolean;
  handleIsOpen: () => void;
  notificationList: NotificationItemType[];
  totalCount: number;
  handleDeleteClick: (id: number) => void;
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
