import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import IconButton from "./IconButton";
import Logo from "@images/image_logo.png";
import AlarmIcon from "@icons/ic_alarm.svg";
import DefaultProfileIcon from "@icons/ic_profile.svg";

const HeaderLoggedOut: React.FC = () => {
  return (
    <div>
      <Link
        href="/login"
        className="text-[14px] font-normal text-[var(--color-gray600)]"
      >
        로그인
      </Link>
    </div>
  );
};

interface HeaderLoggedInProps {
  profileIconSrc?: string | StaticImageData;
}

const HeaderLoggedIn: React.FC<HeaderLoggedInProps> = ({ profileIconSrc }) => {
  return (
    <div className="flex items-center gap-[24px]">
      <IconButton
        src={AlarmIcon}
        alt="알람 아이콘"
        className="h-[32px] w-[32px]"
      />
      <IconButton
        src={profileIconSrc || DefaultProfileIcon}
        alt="프로필 아이콘"
        className="h-[32px] w-[32px] rounded-full"
      />
    </div>
  );
};

interface HeaderProps {
  isLoggedIn: boolean;
  profileIconSrc?: string | StaticImageData;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, profileIconSrc }) => {
  return (
    <div className="shadow-m flex h-[80px] w-full items-center justify-between bg-[var(--color-white)] pl-[20px] pr-[20px] shadow-md">
      <div className="flex items-center gap-[40px]">
        <Link href="/">
          <Image src={Logo} alt="로고이미지" className="h-[30px] w-[107px]" />
        </Link>
        <Link
          href="/wikilist"
          className="text-[14px] font-normal text-[var(--color-gray800)]"
        >
          위키목록
        </Link>
        <Link
          href="/boards"
          className="text-[14px] font-normal text-[var(--color-gray800)]"
        >
          자유게시판
        </Link>
      </div>
      {isLoggedIn ? (
        <HeaderLoggedIn profileIconSrc={profileIconSrc} />
      ) : (
        <HeaderLoggedOut />
      )}
    </div>
  );
};

export default Header;
