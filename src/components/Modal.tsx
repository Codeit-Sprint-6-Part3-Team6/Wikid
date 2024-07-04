import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  handleIsOpen?: () => void;
};

export default function Modal({ isOpen, handleIsOpen }: ModalProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#474D664D]">
          <div className="flex w-[335px] flex-col rounded-lg bg-white p-5 text-black shadow-2xl backdrop-blur-md sm:min-w-[395px]">
            <button className="mb-2 place-self-end text-[#8F95B2]">
              <X onClick={handleIsOpen} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
