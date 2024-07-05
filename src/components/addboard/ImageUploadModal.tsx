import { ChangeEvent, useState } from "react";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import Modal from "@components/Modal";
import Button from "../Button";

type ImageUploadModalProps = {
  isOpen: boolean;
  handleIsOpen: () => void;
  onClick: () => void;
};

export default function ImageUploadModal({
  isOpen,
  handleIsOpen,
  onClick,
}: ImageUploadModalProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState("");

  const handlePreview = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const insertedImageURL = URL.createObjectURL(e.target.files[0]);
      setPreviewImageUrl(insertedImageURL);
    }
  };

  return (
    <Modal isOpen={true} handleIsOpen={handleIsOpen}>
      <div className="flex flex-col">
        <p className="text-center text-[16px] font-semibold text-[#474D66] sm:text-[18px]">
          이미지
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClick();
          }}
          className="mt-[15px] flex flex-col"
        >
          <label
            htmlFor="file-input"
            className={`${previewImageUrl ? "h-[355px] w-[350px]" : "h-[160px]"} relative flex cursor-pointer items-center justify-center rounded-xl bg-[#F7F7FA] text-[#C6CADA]`}
          >
            {!previewImageUrl && <Camera className="animate-bounce" />}
            {previewImageUrl && (
              <Image
                alt="image-preview"
                className="h-full rounded-xl"
                src={previewImageUrl}
                fill
              ></Image>
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
            color={`${previewImageUrl ? "green" : "gray"}`}
            onClick={onClick}
            className={`mt-[20px] place-self-end border-none px-5 py-3 ${previewImageUrl ? "" : "bg-gray300 text-white"}`}
          />
        </form>
      </div>
    </Modal>
  );
}
