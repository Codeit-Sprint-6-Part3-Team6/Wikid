import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  handleIsOpen: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, handleIsOpen, children }: ModalProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex h-[100vh] w-full items-center justify-center">
          <div
            onClick={handleIsOpen}
            className="absolute inset-[0px] bg-[#474D664D]"
          ></div>
          <div className="z-50 flex w-[335px] flex-col rounded-lg bg-white p-5 text-black shadow-2xl sm:min-w-[395px]">
            <button className="mb-2 place-self-end text-[#8F95B2]">
              <X onClick={handleIsOpen} />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
