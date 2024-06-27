import { useState } from "react";
import { X } from "lucide-react";

// AlarmModalProps type에 아직 미숙한 부분 있을 수 있습니다.
type AlarmModalProps = {
  buttonColor: "red" | "green";
  isOpen: boolean;
  handleIsOpen: () => {};
  heading: "";
  message: "";
  body: "";
  buttonText: "";
  onClick: () => {};
};

// 원하는 색깔이 있으시면 여기에 변수를 선언하고 사용하시면 됩니다. 위의 AlarmModalProps도 수정해주세요.
const colorVariants = {
  green: "bg-[#4CBFA4]",
  red: "bg-[#D14343]",
};

export default function AlarmModal({
  buttonColor,
  isOpen,
  handleIsOpen,
  heading,
  message,
  buttonText,
  onClick,
}: AlarmModalProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#474D664D]">
          <div className="flex h-[215px] w-[335px] flex-col justify-center gap-4 rounded-xl bg-white p-5 shadow-xl sm:w-[395px]">
            <button
              onClick={handleIsOpen}
              className="place-self-end text-[#8F95B2]"
            >
              <X />
            </button>
            <p className="text-[16px] text-[#474D66] sm:text-[18px]">
              {heading}
            </p>
            <p className="text-[14px] text-[#8F95B2] sm:text-[16px]">
              {message}
            </p>
            <button
              onClick={onClick}
              className={`mt-3 place-self-end rounded-xl p-3 px-5 py-2 text-[14px] text-white ${colorVariants[buttonColor]}`}
            >
              {buttonText}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
