import Image from "next/image";
import defaultProfile from "@icons/ic_profile.svg";

type ProfileImageProps = {
  imageUrl: string | null;
};

function ProfileImage({ imageUrl }: ProfileImageProps) {
  return (
    <div className="relative h-[200px] w-[200px] rounded-full object-cover">
      <Image
        src={imageUrl === null ? defaultProfile : imageUrl}
        alt="Profile"
        className="rounded-full"
        fill
        priority
        //sizes prop추가하라고 경고뜸 반응형 관련 예상
      />
    </div>
  );
}

export default ProfileImage;
