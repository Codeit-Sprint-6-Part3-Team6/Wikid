import { X } from "lucide-react";
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
  const handleClick = () => {
    onClick(data.id);
  };

  const elapsedTime = elapsedTimeConverter(data.createdAt);

  return (
    <div className="my-[16px]">
      <div className="group flex items-center justify-between gap-[10px] rounded-md bg-white px-[12px] py-[16px] text-[#A4A1AA] duration-100 hover:scale-105 hover:opacity-95 lg:w-[328px]">
        {/* <div className="flex items-center justify-between"> */}
        <div className="flex items-center gap-1 sm:gap-3">
          <div className="items h-[5px] w-[5px] rounded-full bg-[#0085FF] group-hover:bg-[#FF472E]"></div>
          <p>{elapsedTime}</p>
          {/* <div
            className="flex size-10 cursor-pointer items-center justify-center rounded-full"
            onClick={handleClick}
          > */}
          {/* </div> */}
          {/* </div> */}
          <p className="text-[#1B1B1B]">{data.content}</p>
        </div>
        <div className="">
          <X onClick={handleClick} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

// createdAt의 시간을 현재시각과 비교하여 "분" or "시간"전으로 표시하는 logic이 필요함
// 빨강색과 초록색을 나누는 기준을 생각해서 다르게 rendering하는 방법을 생각해보자
