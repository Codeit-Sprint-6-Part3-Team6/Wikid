import { X } from "lucide-react";
import Link from "next/link";
import useUserInfo from "@hooks/useUserInfo";
import { elapsedTimeConverter } from "@lib/elapsedTimeConverter";
import { NotificationItemType } from "@lib/types/Notifications";

type NotificationItemProps = {
  data: NotificationItemType;
  onClick: (id: number) => void;
};

export default function NotificationItem({
  data,
  onClick,
}: NotificationItemProps) {
  const { user } = useUserInfo();
  const userCode = user?.profile.code;
  const handleCloseClick = () => {
    onClick(data.id);
  };

  const elapsedTime = elapsedTimeConverter(data.createdAt);

  return (
    <div className="group my-[16px] flex items-center justify-between gap-[10px] rounded-md bg-white px-[12px] py-[16px] text-[#A4A1AA] duration-100 hover:scale-105 hover:opacity-95 lg:w-[328px]">
      <Link
        onClick={handleCloseClick}
        href={`/wiki/${userCode}`}
        className="cursor-pointer"
      >
        <div className="flex items-center gap-1 after:block after:w-2 sm:gap-3">
          <div className="items h-[5px] w-[5px] rounded-full bg-[#0085FF] group-hover:bg-[#FF472E]"></div>
          <p>{elapsedTime}</p>
          <p className="text-[#1B1B1B]">{data.content}</p>
        </div>
      </Link>
      <X onClick={handleCloseClick} className="cursor-pointer" />
    </div>
  );
}
