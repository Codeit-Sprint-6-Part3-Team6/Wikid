import ProfileImage from "./ProfileImage";
import ProfileInfoList from "./ProfileInfoList";
import { Profile } from "@lib/types/Profile";

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div
      className={`flex w-full flex-col items-center gap-6 rounded-[10px] px-6 py-6 shadow-[0_4px_20px_0_#00000014] md:flex-row md:gap-8 md:py-4 lg:flex-col lg:gap-[60px] lg:px-[30px] lg:pb-[30px] lg:pt-[60px]`}
    >
      <ProfileImage imageUrl={profile.image} />
      <ProfileInfoList profile={profile} isEditMode={false} />
    </div>
  );
}

export default ProfileCard;
