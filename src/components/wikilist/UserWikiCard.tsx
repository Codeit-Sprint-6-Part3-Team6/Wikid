import Image from "next/image";
import Link from "next/link";
import LinkCopyButton from "@components/LinkCopyButton";
import { Profile } from "@lib/types/Profile";
import profileIcon from "@icons/ic_profile.svg";

interface UserWikiCardProps {
  profile: Profile;
}

const UserWikiCard = ({ profile }: UserWikiCardProps) => {
  return (
    <div className="mb-[24px] rounded-[10px] shadow-[0_4px_20px_0_rgba(0,0,0,0.08)]">
      <Link
        href={`/wiki/${profile.code}`}
        className="flex h-[140px] items-end justify-between gap-[20px] p-[25px_35px]"
      >
        <div className="flex items-center gap-[32px]">
          <Image
            src={profile.image || profileIcon}
            alt={profile.name}
            width={85}
            height={85}
            className="h-[85px] w-[85px] rounded-full"
          />
          <div>
            <div className="mb-[15px] text-[24px] font-semibold">
              {profile.name}
            </div>
            <div className="text-gray400">{profile.city}</div>
            <div className="text-gray400">{profile.job}</div>
          </div>
        </div>
        <LinkCopyButton link="https://www.wikied.kr/wikicode" />
      </Link>
    </div>
  );
};

export default UserWikiCard;
