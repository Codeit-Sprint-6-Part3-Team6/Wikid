import { ReactNode, useEffect } from "react";
import Image from "next/image";
import greenIcon from "@icons/ic_toast_green.svg";
import redIcon from "@icons/ic_toast_red.svg";

interface ToastProps {
  children?: ReactNode;
  show: boolean;
  type: string;
}

const Toast = ({ children, show, type }: ToastProps) => {
  const icon = type === "green" ? greenIcon : redIcon;
  const className =
    type === "green"
      ? "bg-green100 border-green200 text-green300"
      : "bg-red100 border-red300 text-red300";

  return (
    <>
      {show && (
        <div className="fixed inset-x-0 top-7 flex justify-center">
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
