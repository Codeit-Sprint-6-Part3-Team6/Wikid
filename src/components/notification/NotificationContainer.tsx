import { X } from "lucide-react";

type NotificationContainerProps = {
  totalCount: number;
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
    <div className="lg:w-[368px] rounded-xl bg-[#CED8D5] px-[20px] py-[24px] w-[270px]">
      <div className="flex items-center justify-between text-[20px] font-[700] text-[#1B1B1B] w-full">
        <p>알림 {totalCount}개</p>
        <X onClick={handleClick} className="cursor-pointer" />
      </div>
      {children}
    </div>
  );
}
