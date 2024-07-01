import { useState } from "react";
import { X } from "lucide-react";
import Button from "./Button";

// AlarmModalProps type에 아직 미숙한 부분 있을 수 있습니다.
type AlarmModalProps = {
  type: "confirm" | "alert";
  isOpen: boolean;
  handleIsOpen: () => {};
  heading: "";
  message: "";
  body: "";
  buttonText: "";
  onClick: () => {};
};

export default function AlarmModal({
  type,
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
            <Button
              onClick={onClick}
              text={buttonText}
              color={type == "confirm" ? "green" : "white"}
              type={"button"}
              className={`h-[40px] min-w-[65px] place-self-end px-3 text-white ${type === "alert" ? `border-none bg-[#D14343]` : ""}`}
            />
          </div>
        </div>
      )}
    </>
  );
}
