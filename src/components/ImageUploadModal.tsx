import { useState } from "react";
import { Camera, X } from "lucide-react";
import Button from "./Button";

type ImageUploadModalProps = {
  isOpen: boolean;
  handleIsOpen: () => void;
  onClick: () => void;
};

export default function ImageUploadModal({
  isOpen = true,
  handleIsOpen,
  onClick,
}: ImageUploadModalProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState("");

  const handlePreview = (e) => {
    const insertedImageURL = URL.createObjectURL(e.target.files[0]);
    setPreviewImageUrl(insertedImageURL);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#474D664D]">
          <div className="flex h-[338px] w-[278px] flex-col items-center justify-center gap-4 rounded-xl bg-white p-5 shadow-xl sm:h-[336px] sm:w-[395px]">
            <button
              onClick={handleIsOpen}
              className="place-self-end text-[#8F95B2]"
            >
              <X />
            </button>
            <p className="text-[16px] font-semibold text-[#474D66] sm:text-[18px]">
              이미지
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onClick();
              }}
              className="flex w-full flex-col"
            >
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
              {/* 보이지 않는 input이라서 공통 component를 사용하지 않고 기존의 input으로 남겨두겠습니다. */}
              <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={handlePreview}
              ></input>
              <Button
                type="button"
                text="삽입하기"
                color="white"
                onClick={onClick}
                className="mt-3 place-self-end border-none bg-gray-300 px-5 py-3 text-white"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
