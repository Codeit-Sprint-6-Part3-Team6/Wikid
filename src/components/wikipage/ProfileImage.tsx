import Image from "next/image";
import { validateImage } from "@lib/validateImage";

function ProfileImage({ imageUrl }: { imageUrl: string | null }) {
  const imageSrc = validateImage(imageUrl);

  return (
    <div className="relative h-[200px] w-[200px]">
      <Image
        src={imageSrc}
        alt="Profile"
        className="rounded-full object-cover"
        fill
        priority
        //sizes prop추가하라고 경고뜸 반응형 관련 예상
      />
    </div>
  );
}

export default ProfileImage;
