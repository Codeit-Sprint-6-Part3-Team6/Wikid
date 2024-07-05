import Image from "next/image";
import Link from "next/link";
import LinkCopyButton from "@components/LinkCopyButton";
import { Profile } from "@lib/types/Profile";
import profileIcon from "@icons/ic_profile.svg";

interface UserWikiCardProps {
  profile: Profile;
}

const UserWikiCard = ({ profile }: UserWikiCardProps) => {
  const imageSrc =
    profile.image && profile.image.includes("sprint") // "https://example.com/..." 이 이미지 때문에 에러떠서 임시로 이렇게 구현했어요.
      ? profile.image
      : profileIcon;

  return (
    <div className="relative mb-[24px] h-[175px] rounded-[10px] shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] md:h-[140px]">
      <Link
        href={`/wiki/${profile.code}`}
        className="block h-full w-full p-[20px_25px] md:p-[25px_35px]"
      >
        <div className="flex items-start gap-[20px] md:items-center md:gap-[32px]">
          <div className="relative h-[60px] w-[60px] md:h-[85px] md:w-[85px]">
            <Image
              src={imageSrc}
              alt={profile.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <div className="mb-[10px] text-[20px] font-semibold md:mb-[15px] md:text-[24px]">
              {profile.name}
            </div>
            <div className="text-gray400">{profile.city}</div>
            <div className="text-gray400">{profile.job}</div>
          </div>
        </div>
      </Link>
      <LinkCopyButton
        link={`http://localhost:3000/wiki/${profile.code}`}
        className="absolute bottom-[25px] left-[105px] right-[25px] md:left-auto md:right-[35px]"
      />
    </div>
  );
};

export default UserWikiCard;
