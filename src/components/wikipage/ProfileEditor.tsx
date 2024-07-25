import ProfileImageEditor from "./ProfileImageEditor";
import ProfileInfoList from "./ProfileInfoList";
import { Profile } from "@lib/types/Profile";

type ProfileEditorProps = {
  profile: Profile;
  profileImage: string | null;
  onChange: () => Promise<void>;
  onFocusOut: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function ProfileEditor({
  profile,
  profileImage,
  onChange,
  onFocusOut: onBlur,
  onFileChange,
  onDeleteClick,
}: ProfileEditorProps) {
  return (
    <div
      className={`flex w-full flex-col items-center gap-6 rounded-[10px] px-6 py-6 shadow-[0_4px_20px_0_#00000014] md:flex-row md:gap-8 md:py-4 lg:flex-col lg:gap-[60px] lg:px-[40px] lg:pb-[30px] lg:pt-[60px]`}
    >
      <ProfileImageEditor imageUrl={profileImage} onChange={onFileChange} onClick={onDeleteClick} />
      <ProfileInfoList profile={profile} isEditMode={true} onChange={onChange} onBlur={onBlur} />
    </div>
  );
}

export default ProfileEditor;
