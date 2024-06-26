import { useState } from "react";
import { Camera, X } from "lucide-react";

// ImageUploadModalProps type에 아직 미숙한 부분 있을 수 있습니다.
type ImageUploadModalProps = {
  modalSwitch: boolean;
  toggleModal: () => {};
};

export default function ImageUploadModal(
  modalSwitch,
  toggleModal,
): ImageUploadModalProps {
  // modalSwitch를 prop으로 전달받으면, 아래의 modalState 일체를 삭제시키고 modalSwitch로 대체하면 됩니다.
  // return문 가장 첫번째에 있는 modalState도 modalSwitch로 바꿔주세요.
  const [modalState, setModalState] = useState<boolean>(true);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const handlePreview = (e) => {
    const insertedImageURL = URL.createObjectURL(e.target.files[0]);
    setPreviewImageUrl(insertedImageURL);
  };

  // toggleModal을 prop으로 받으면, 아래의 handleExitButtonClick을 삭제하고, 해당 버튼의 onClick={toggleModal}으로 설정해주세요.
  const handleExitButtonClick = () => {
    setModalState(!modalState);
  };

  return (
    <>
      {modalState && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#474D664D]">
          <div className="flex h-[338px] w-[278px] flex-col items-center justify-center gap-4 rounded-xl bg-white p-5 shadow-xl sm:h-[336px] sm:w-[395px]">
            <button
              onClick={handleExitButtonClick}
              className="place-self-end text-[#8F95B2]"
            >
              <X />
            </button>
            <p className="text-[16px] font-semibold text-[#474D66] sm:text-[18px]">
              이미지
            </p>
            <form className="flex w-full flex-col">
              <label
                htmlFor="file-input"
                className="relative flex h-[160px] w-full cursor-pointer items-center justify-center rounded-xl bg-[#F7F7FA] text-[#C6CADA]"
              >
                <Camera className="animate-bounce" />
                {previewImageUrl && (
                  <img
                    alt="image-preview"
                    className="absolute h-full w-full object-contain"
                    src={previewImageUrl}
                  ></img>
                )}
              </label>
              <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={handlePreview}
              ></input>
              <button className="mt-3 place-self-end rounded-xl bg-[#C6CADA] p-3 px-5 py-2 text-[14px] text-white">
                삽입하기
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
