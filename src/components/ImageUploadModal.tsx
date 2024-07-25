import { ChangeEvent, useEffect, useState } from "react";
import { Camera } from "lucide-react";
import Button from "@components/Button";
import Modal from "@components/Modal";

type ImageUploadModalProps = {
  isOpen: boolean;
  toggleIsOpen: () => void;
  onClick: (imageSrc: string) => void;
};

export default function ImageUploadModal({ isOpen, toggleIsOpen, onClick }: ImageUploadModalProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState("");

  const handlePreview = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const insertedImageURL = URL.createObjectURL(e.target.files[0]);
      setPreviewImageUrl(insertedImageURL);
    }
  };

  useEffect(() => {
    setPreviewImageUrl("");
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} handleIsOpen={toggleIsOpen}>
      <div className="flex flex-col">
        <p className="text-center text-[16px] font-semibold text-[#474D66] sm:text-[18px]">
          이미지
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClick(previewImageUrl);
          }}
          className="mt-[15px] flex flex-col"
        >
          <label
            htmlFor="file-input"
            className={`${previewImageUrl ? "max-h-[40vh] min-h-[160px] max-w-[40vw]" : "h-[160px]"} relative flex cursor-pointer items-center justify-center rounded-xl bg-[#F7F7FA] text-[#C6CADA]`}
          >
            {!previewImageUrl && <Camera className="animate-bounce" />}
            {previewImageUrl && (
              <img
                alt="image-preview"
                className="min-h-[90%] min-w-[90%] rounded-lg"
                src={previewImageUrl}
              ></img>
            )}
          </label>
          {/* 보이지 않는 input이라서 공통 component를 사용하지 않고 기존의 input으로 남겨두겠습니다. */}
          <input id="file-input" type="file" className="hidden" onChange={handlePreview}></input>
          <Button
            type="button"
            text="삽입하기"
            color={`${previewImageUrl ? "green" : "gray"}`}
            disabled={!previewImageUrl}
            onClick={() => onClick(previewImageUrl)}
            className={`mt-[20px] place-self-end border-none px-5 py-3 ${previewImageUrl ? "" : "bg-gray300 text-white"}`}
          />
        </form>
      </div>
    </Modal>
  );
}
