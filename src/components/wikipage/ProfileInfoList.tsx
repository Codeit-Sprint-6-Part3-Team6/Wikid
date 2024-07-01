import Input from "@components/Input";
import refineProfileInfo from "@lib/refineProfileInfo";
import { Profile } from "@lib/types/Profile";

type ProfileInfoListProps = {
  profile: Profile;
  isEditMode: boolean;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};
type ProfileInfoProps = {
  info: string[];
  id: string;
  isEditMode: boolean;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export default function ProfileInfoList({
  profile,
  isEditMode,
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
          onBlur={onBlur}
        />
      ))}
    </div>
  );
}

function ProfileInfo({ info, id, isEditMode, onBlur }: ProfileInfoProps) {
  return (
    <div className="flex items-center gap-5">
      <div className="text-gray400 w-[60px] flex-shrink-0 text-sm font-normal leading-6">
        {info[1]}
      </div>
      {isEditMode ? (
        <Input id={id} defaultValue={info[2]} onBlur={onBlur} />
      ) : (
        <div className="text-gray500 text-sm font-normal leading-6">
          {info[2]}
        </div>
      )}
    </div>
  );
}
