import Input from "@components/Input";
import { refineProfileInfo } from "@lib/purifyProfileProperties";
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

  const className = isEditMode ? "lg:max-w-[320px]" : "lg:max-w-[260px]";

  return (
    <div
      className={`${className} grid w-full gap-3 border-t-[1px] border-solid border-gray200 pt-3 md:grid-cols-2 md:grid-rows-5 md:border-none md:pt-0 lg:flex lg:flex-col lg:flex-wrap lg:gap-4`}
    >
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
    <div className="flex items-center gap-7 md:gap-5">
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
