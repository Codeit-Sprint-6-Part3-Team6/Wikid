import Image from "next/image";
import loadingCat from "@images/image_loading.gif";

export default function SmallCat() {
  return (
    <div className="absolute inset-0 flex items-center">
      <Image alt="loading-cat" src={loadingCat} className="-rotate-[15deg]" />;
    </div>
  );
}
