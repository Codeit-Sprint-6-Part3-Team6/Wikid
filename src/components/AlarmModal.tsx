import { useState } from "react";
import { X } from "lucide-react";

type AlarmModalProps = {
  type: "disconnected" | "unsaving";
  modalSwitch: boolean;
  toogleModal: () => {};
};

export default function AlarmModal({ type }: AlarmModalProps) {
  const [modalState, setModalState] = useState(true);

  const colorVariants = {
    disconnected: "bg-[#4CBFA4]",
    unsaving: "bg-[#D14343]",
  };

  const handleToggle = () => {
    setModalState(!modalState);
  };

  return (
    <>
      {modalState && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#474D664D]">
          <div className="flex h-[215px] w-[335px] flex-col justify-center gap-4 rounded-xl bg-white p-5 shadow-xl sm:w-[395px]">
            <button
              onClick={handleToggle}
              className="place-self-end text-[#8F95B2]"
            >
              <X />
            </button>
            <p className="text-[16px] text-[#474D66] sm:text-[18px]">
              {type == "disconnected" &&
                "5분 이상 글을 쓰지 않아 접속이 끊어졌어요."}
              {type == "unsaving" && "저장하지 않고 나가시겠어요?"}
            </p>
            <p className="text-[14px] text-[#8F95B2] sm:text-[16px]">
              {type == "disconnected" &&
                "위키 참여하기를 통해 다시 위키를 수정해 주세요."}
              {type == "unsaving" && "작성하신 모든 내용이 사라집니다."}
            </p>
            <button
              className={`mt-3 place-self-end rounded-xl p-3 px-5 py-2 text-[14px] text-white ${colorVariants[type]}`}
            >
              {type == "disconnected" && "확인"}
              {type == "unsaving" && "페이지 나가기"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
