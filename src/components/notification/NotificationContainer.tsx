import { X } from "lucide-react";

type NotificationContainerProps = {
  totalCount: number | undefined;
  children: React.ReactNode;
  onClick: () => void;
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
    <div className="w-[280px] max-h-[285px] shadow-xl overflow-scroll rounded-xl bg-[#CED8D5] px-[20px] py-[24px] text-[11px] sm:w-[310px] sm:text-[12px] lg:w-[368px] lg:text-[14px]">
      <div className="flex w-full items-center justify-between text-[#1B1B1B]">
        <p className="text-[16px] font-[500] sm:text-[20px]">
          알림 {totalCount}개
        </p>
        <X onClick={handleClick} className="cursor-pointer" />
      </div>
      {children}
    </div>
  );
}
