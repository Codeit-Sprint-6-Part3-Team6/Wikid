import { useState } from "react";
import { Camera, X } from "lucide-react";

type ImageUploadModalProps = {
  modalSwitch: boolean;
  toggleModal: () => {};
};

export default function ImageUploadModal(
  modalSwitch,
  toggleModal,
): ImageUploadModalProps {
  // modalState를 modalSwitch로 대체해 주세요.
  const [modalState, setModalState] = useState<boolean>(true);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const handlePreview = (e) => {
    const insertedImageURL = URL.createObjectURL(e.target.files[0]);
    setPreviewImageUrl(insertedImageURL);
  };

  // handleExitButtonClick을 modalSwitch로 대체해 주세요.
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
