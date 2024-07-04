import Image from "next/image";
import SpinnerIcon from "@images/image_spinner.png";

// 헤더 제외한 부분에서 중앙에 위치할 수 있도록
// viewport height - header height
function Loading() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <Image
        className="h-[20px] w-[20px] animate-spin"
        src={SpinnerIcon}
        alt="loading spinner"
      />
    </div>
  );
}

export default Loading;
