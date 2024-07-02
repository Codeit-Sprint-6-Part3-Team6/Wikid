import { Notification } from "@lib/types/Notifications";
import { X } from "lucide-react";

type NotificationItemProps = {
  data: Notification;
  onClick: (id: number) => void;
};

export default function NotificationItem({
  data,
  onClick,
}: NotificationItemProps) {
  const handleClick = () => {
    onClick(data.id);
  };

  return (
    <div className="my-[16px]">
      <div className="flex w-[328px] flex-col gap-[10px] rounded-md bg-white px-[12px] py-[16px] text-[#A4A1AA]">
        <div className="flex items-center justify-between">
          <div className="items h-[5px] w-[5px] rounded-full bg-[#0085FF]"></div>
          <X onClick={handleClick} className="cursor-pointer place-self-end" />
        </div>
        <p className="text-[#1B1B1B]">{data.content}</p>
        <p>{data.createdAt}</p>
      </div>
    </div>
  );
}

// createdAt의 시간을 현재시각과 비교하여 "분" or "시간"전으로 표시하는 logic이 필요함
// 빨강색과 초록색을 나누는 기준을 생각해서 다르게 rendering하는 방법을 생각해보자
