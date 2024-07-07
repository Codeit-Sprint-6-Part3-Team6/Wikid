import Image from "next/image";
import loadingCat from "@images/image_loading.gif";

export default function SmallCat() {
  return (
    <div className="absolute inset-0 -rotate-[15deg]">
      <Image alt="loading-cat" src={loadingCat} />;
    </div>
  );
}
