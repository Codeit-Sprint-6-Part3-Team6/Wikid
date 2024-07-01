import Image from "next/image";
import defaultProfile from "@icons/ic_profile.svg";

type ProfileImageProps = {
  imageUrl: string | null;
};

function ProfileImage({ imageUrl }: ProfileImageProps) {
  return (
    <Image
      src={imageUrl === null ? defaultProfile : imageUrl}
      alt="Profile"
      className="h-[200px] w-[200px] rounded-full"
    />
  );
}

export default ProfileImage;
