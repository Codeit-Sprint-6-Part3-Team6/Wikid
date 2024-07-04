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
            className="absolute inset-0 bg-[#474D664D]"
          ></div>
          <div className="relative inset-0 z-50 m-[0_auto] flex w-[335px] flex-col rounded-lg bg-white p-5 text-black shadow-2xl backdrop-blur-md sm:min-w-[395px]">
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
