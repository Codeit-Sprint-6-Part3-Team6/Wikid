import React from "react";
import ProfileImage from "./ProfileImage";
import ProfileImageEditor from "./ProfileImageEditor";
import ProfileInfoList from "./ProfileInfoList";
import { Profile } from "@lib/types/Profile";

type ProfileCardProps = {
  className?: string;
  profile: Profile;
  profileImage: string | null;
  isEditMode: boolean;
  onFocusOut: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function ProfileCard({
  className,
  profile,
  profileImage,
  isEditMode,
  onFocusOut: onBlur,
  onFileChange,
  onDeleteClick,
}: ProfileCardProps) {
  const style = `${className} ${isEditMode ? "px-[40px]" : "px-[30px]"}`;

  return (
    <div
      className={`${style} flex w-full flex-col items-center gap-[60px] rounded-[10px] pb-[30px] pt-[60px] shadow-[0_4px_20px_0_#00000014]`}
    >
      {isEditMode ? (
        <ProfileImageEditor
          imageUrl={profileImage}
          onChange={onFileChange}
          onClick={onDeleteClick}
        />
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
