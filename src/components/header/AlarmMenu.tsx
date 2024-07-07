import IconButton from "@components/IconButton";
import NotificationList from "@components/NotificationList";
import useModal from "@hooks/useModal";
import useNotificationList from "@hooks/useNotificationList";
import AlarmIcon from "@icons/ic_alarm.svg";

const AlarmMenu = () => {
  const [isOpen, handleIsOpen] = useModal();
  const { notificationList, totalCount, handleDeleteClick } =
    useNotificationList(isOpen);

  return (
    <>
      <IconButton
        src={AlarmIcon}
        alt="알람 아이콘"
        className={`h-[32px] w-[32px] ${totalCount ? "animate-pulse" : ""}`}
        totalCount={totalCount}
        onClick={handleIsOpen}
      />
      <div className="absolute -left-[230px] top-[45px] z-50 sm:-left-[250px] lg:-left-[350px]">
        <NotificationList
          isOpen={isOpen}
          handleIsOpen={handleIsOpen}
          notificationList={notificationList}
          totalCount={totalCount}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </>
  );
};

export default AlarmMenu;
