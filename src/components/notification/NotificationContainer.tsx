import { X } from "lucide-react";

type NotificationContainerProps = {
  totalCount: number | undefined;
  children: React.ReactNode;
  onClick: () => {};
};

export default function NotificationContainer({
  totalCount,
  children,
  onClick,
}: NotificationContainerProps) {
  const handleClick = () => {
    onClick();
  };

  return (
    <div className="w-[270px] rounded-xl bg-[#CED8D5] px-[20px] py-[24px] lg:w-[368px]">
      <div className="flex w-full items-center justify-between text-[20px] font-[700] text-[#1B1B1B]">
        <p>알림 {totalCount}개</p>
        <X onClick={handleClick} className="cursor-pointer" />
      </div>
      {children}
    </div>
  );
}
