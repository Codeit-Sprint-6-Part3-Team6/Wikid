import { ReactNode, useEffect } from "react";
import Image from "next/image";
import greenIcon from "@icons/ic_toast_green.svg";
import redIcon from "@icons/ic_toast_red.svg";

interface ToastProps {
  children?: ReactNode;
  isToastOpened: boolean;
  type: string;
}

const Toast = ({ children, isToastOpened, type }: ToastProps) => {
  const icon = type === "green" ? greenIcon : redIcon;
  const className =
    type === "green"
      ? "bg-green100 border-green200 text-green300"
      : "bg-red100 border-red300 text-red300";

  return (
    <>
      {isToastOpened && (
        <div className="animate-fadeIn fixed inset-x-0 top-[120px] z-10 flex justify-center">
          <div
            className={`flex h-12 items-center gap-4 rounded-lg border border-solid px-5 ${className}`}
          >
            <Image src={icon} alt="토스트 아이콘" />
            <p className="font-semibold">{children}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
