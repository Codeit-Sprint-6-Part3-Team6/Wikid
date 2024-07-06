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
  onChange: () => Promise<void>;
  onFocusOut: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function ProfileCard({
  className,
  profile,
  profileImage,
  isEditMode,
  onChange,
  onFocusOut: onBlur,
  onFileChange,
  onDeleteClick,
}: ProfileCardProps) {
  const style = `${className} ${isEditMode ? "md:px-[40px]" : "md:px-[30px]"}`;

  return (
    <div
      className={`${style} flex w-full flex-col items-center gap-6 rounded-[10px] px-10 py-6 shadow-[0_4px_20px_0_#00000014] md:flex-row md:gap-8 md:py-4 lg:flex-col lg:gap-[60px] lg:pb-[30px] lg:pt-[60px]`}
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
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}

export default ProfileCard;
