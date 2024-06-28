import React from "react";
import ProfileImage from "./ProfileImage";
import ProfileImageEditor from "./ProfileImageEditor";
import ProfileInfoList from "./ProfileInfoList";
import { Profile } from "@lib/types/Profile";

type ProfileCardProps = {
  profile: Profile;
  profileImage: string | null;
  isEditMode: boolean;
  onFocusOut: (e: React.FocusEvent<HTMLInputElement>) => void;
};

function ProfileCard({
  profile,
  profileImage,
  isEditMode,
  onFocusOut: onBlur,
}: ProfileCardProps) {
  const className = isEditMode ? "w-[400px] px-[40px]" : "w-[320px] px-[30px]";

  return (
    <div
      className={`${className} flex flex-col items-center gap-[60px] rounded-[10px] pb-[30px] pt-[60px] shadow-[0_4px_20px_0_#00000014]`}
    >
      {isEditMode ? (
        <ProfileImageEditor imageUrl={profileImage} />
      ) : (
        <ProfileImage imageUrl={profileImage} />
      )}
      <ProfileInfoList
        profile={profile}
        isEditMode={isEditMode}
        onBlur={onBlur}
      />
    </div>
  );
}

export default ProfileCard;
