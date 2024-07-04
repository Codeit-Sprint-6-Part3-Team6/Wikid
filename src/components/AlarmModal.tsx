import { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import Modal from "./Modal";

// AlarmModalProps type에 아직 미숙한 부분 있을 수 있습니다.
type AlarmModalProps = {
  type: "confirm" | "alert";
  isOpen: boolean;
  handleIsOpen: Dispatch<SetStateAction<boolean>>;
  heading: string;
  message: string;
  buttonText: string;
  onClick: () => void;
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
        <Modal handleIsOpen={handleIsOpen} isOpen={isOpen}>
          <p className="text-[16px] text-[#474D66] sm:text-[18px]">{heading}</p>
          <p className="text-[14px] text-[#8F95B2] sm:text-[16px]">{message}</p>
          <Button
            onClick={onClick}
            text={buttonText}
            color={type == "confirm" ? "green" : "red"}
            type={"button"}
            className={`h-[40px] min-w-[65px] place-self-end px-3 text-white ${type === "alert" ? `border-none` : ""}`}
          />
        </Modal>
      )}
    </>
  );
}
