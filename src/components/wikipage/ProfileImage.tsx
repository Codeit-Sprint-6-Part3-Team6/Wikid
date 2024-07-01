import Image from "next/image";
import defaultProfile from "@icons/ic_profile.svg";

type ProfileImageProps = {
  imageUrl: string | null;
};

function ProfileImage({ imageUrl }: ProfileImageProps) {
  return (
    <div className="relative h-[200px] w-[200px] rounded-full">
      <Image
        src={imageUrl === null ? defaultProfile : imageUrl}
        alt="Profile"
        className="rounded-full"
        fill
        objectFit="cover"
      />
    </div>
  );
}

export default ProfileImage;
