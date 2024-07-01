import Image from "next/image";
import Toast from "./Toast";
import useToast from "@hooks/useToast";
import linkIcon from "@icons/ic_linkGreen.svg";

function LinkCopyButton({ link }: { link: string }) {
  const { toastOpened, showToast } = useToast();

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(link);
      showToast();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="bg-green100 text-green200 flex items-center gap-[5px] rounded-[10px] px-[10px] py-[5px] leading-6"
      >
        <Image src={linkIcon} alt="link" />
        {link}
      </button>
      <Toast type="green" isToastOpened={toastOpened}>
        내 위키 링크가 복사되었습니다.
      </Toast>
    </>
  );
}

export default LinkCopyButton;
// filter: invert(63%) sepia(53%) saturate(388%) hue-rotate(116deg) brightness(93%) contrast(92%);
