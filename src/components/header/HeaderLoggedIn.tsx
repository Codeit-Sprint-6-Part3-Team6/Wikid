import { useState } from "react";
import IconButton from "@components/IconButton";
import AlarmMenu from "./AlarmMenu";
import ProfileMenu from "./ProfileMenu";
import useOutsideClick from "@hooks/useOutsideClick";
import useUserInfo from "@hooks/useUserInfo";

const HeaderLoggedIn = ({ profileIconSrc }: { profileIconSrc: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuRef = useOutsideClick<HTMLButtonElement>(() =>
    setIsMenuOpen(false),
  );

  const { user } = useUserInfo();
  const code = user?.profile?.code;

  return (
    <div className="hidden md:block">
      <div className="flex items-center gap-[20px]">
        <AlarmMenu />
        <IconButton
          src={profileIconSrc}
          alt="프로필 아이콘"
          className="h-[32px] w-[32px] rounded-full"
          unoptimized={true}
          width={32}
          height={32}
          onClick={toggleMenu}
          menuRef={menuRef}
        />
      </div>
      {isMenuOpen && (
        <div>
          <ProfileMenu code={code} />
        </div>
      )}
    </div>
  );
};

export default HeaderLoggedIn;
