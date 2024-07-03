import Input from "@components/Input";
import { refineProfileInfo } from "@lib/handleProfileProperties";
import { Profile } from "@lib/types/Profile";

type ProfileInfoListProps = {
  profile: Profile;
  isEditMode: boolean;
  onChange: () => Promise<void>;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};
type ProfileInfoProps = {
  info: string[];
  id: string;
  isEditMode: boolean;
  onChange: () => Promise<void>;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export default function ProfileInfoList({
  profile,
  isEditMode,
  onChange,
  onBlur,
}: ProfileInfoListProps) {
  const infoList = refineProfileInfo(profile);

  const className = isEditMode ? "max-w-[320px]" : "max-w-[260px]";

  return (
    <div className={`${className} flex w-full flex-col gap-4`}>
      {infoList.map((info) => (
        <ProfileInfo
          key={info[0]}
          id={info[0]}
          info={info}
          isEditMode={isEditMode}
          onChange={onChange}
          onBlur={onBlur}
        />
      ))}
    </div>
  );
}

function ProfileInfo({
  info,
  id,
  isEditMode,
  onChange,
  onBlur,
}: ProfileInfoProps) {
  return (
    <div className="flex items-center gap-5">
      <div className="w-[60px] flex-shrink-0 text-sm font-normal leading-6 text-gray400">
        {info[1]}
      </div>
      {isEditMode ? (
        <Input
          id={id}
          defaultValue={info[2]}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <div className="text-sm font-normal leading-6 text-gray500">
          {info[2]}
        </div>
      )}
    </div>
  );
}
