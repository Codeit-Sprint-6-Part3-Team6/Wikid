import Image from "next/image";
import loadingCat from "@images/no_notification3.gif";

export default function SmallCat() {
  return (
    <div className="flex flex-col items-center gap-[20px]">
      <Image
        alt="loading-cat"
        src={loadingCat}
        width={150}
        height={150}
        className=""
      />
      <div className="text-[14px]">새로운 알림이 없습니다.</div>
    </div>
  );
}
