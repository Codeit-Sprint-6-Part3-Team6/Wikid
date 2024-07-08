import { useState } from "react";
import IconButton from "@components/IconButton";
import NotificationList from "@components/NotificationList";
import useNotificationList from "@hooks/useNotificationList";
import useOutsideClick from "@hooks/useOutsideClick";
import AlarmIcon from "@icons/ic_alarm.svg";

const AlarmMenu = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { notificationList, totalCount, handleDeleteClick } =
    useNotificationList(isNotificationOpen);
  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };
  const alarmRef = useOutsideClick<HTMLDivElement>(() =>
    setIsNotificationOpen(false),
  );

  return (
    <>
      <div className="flex" ref={alarmRef}>
        <IconButton
          src={AlarmIcon}
          alt="알람 아이콘"
          className={`h-[32px] w-[32px] ${totalCount ? "animate-pulse" : ""}`}
          totalCount={totalCount}
          onClick={toggleNotification}
        />
        <div className="absolute -left-[230px] top-[45px] z-50 sm:-left-[250px] lg:-left-[350px]">
          <NotificationList
            isOpen={isNotificationOpen}
            handleIsOpen={toggleNotification}
            notificationList={notificationList}
            totalCount={totalCount}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      </div>
    </>
  );
};

export default AlarmMenu;
