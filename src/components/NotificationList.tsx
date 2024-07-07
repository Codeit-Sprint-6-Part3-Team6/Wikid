import { X } from "lucide-react";
import Link from "next/link";
import SmallCat from "./SmallCat";
import useOutsideClick from "@hooks/useOutsideClick";
import useUserInfo from "@hooks/useUserInfo";
import { elapsedTimeConverter } from "@lib/elapsedTimeConverter";
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
  const handleOutsideClick = () => {
    handleIsOpen();
  };
  const notificationRef = useOutsideClick(handleOutsideClick);

  return (
    <>
      {isOpen && (
        <div
          ref={notificationRef}
          id="outer-most-div"
          className={`${notificationList.length ? "max-h-[285px] bg-[#CED8D5]" : "h-[285px] bg-[#f891fa]"} w-[280px] rounded-xl px-[20px] py-[24px] text-[11px] shadow-xl sm:w-[310px] sm:text-[13px] lg:w-[368px] lg:text-[14px]`}
        >
          <div className="flex w-full items-center justify-between text-[#1B1B1B]">
            <p className="text-[16px] font-[500] sm:text-[20px]">
              {notificationList.length ? `알림 ${totalCount}개` : ""}
            </p>
            <X onClick={handleIsOpen} className="cursor-pointer" />
          </div>
          <div
            className={`relative ${notificationList.length ? "max-h-[230px]" : `h-[230px]`} overflow-y-scroll`}
          >
            <div className="my-[20px] flex h-full flex-col items-center gap-3">
              {notificationList.length ? (
                notificationList.map((item) => (
                  <NotificationItem
                    key={item.id}
                    data={item}
                    onClick={handleDeleteClick}
                  />
                ))
              ) : (
                <SmallCat />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

type NotificationItemProps = {
  data: NotificationItemType;
  onClick: (id: number) => void;
};

function NotificationItem({ data, onClick }: NotificationItemProps) {
  const { user } = useUserInfo();
  const userCode = user?.profile.code;
  const handleCloseClick = () => {
    onClick(data.id);
  };

  const elapsedTime = elapsedTimeConverter(data.createdAt);

  return (
    <div className="group flex items-center justify-between gap-[10px] rounded-md bg-white px-[12px] py-[16px] text-[#A4A1AA] hover:scale-105 hover:opacity-95 hover:duration-100 sm:px-[15px] lg:px-[30px]">
      <Link
        onClick={handleCloseClick}
        href={`/wiki/${userCode}`}
        className="cursor-pointer"
      >
        <div className="flex items-center gap-1 sm:gap-3">
          <div className="items h-[5px] w-[5px] rounded-full bg-[#0085FF] group-hover:bg-[#FF472E]"></div>
          <p>{elapsedTime}</p>
          <p className="text-[#1B1B1B]">{data.content}</p>
        </div>
      </Link>
      <X onClick={handleCloseClick} className="cursor-pointer" />
    </div>
  );
}
