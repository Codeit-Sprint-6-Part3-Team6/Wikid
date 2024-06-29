import React from "react";
import Cookies from "js-cookie";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";
import IconButton from "./IconButton";
import LinkButton from "./LinkButton";
import { useAuth } from "@context/AuthContext";
import Logo from "@images/image_logo.png";
import AlarmIcon from "@icons/ic_alarm.svg";
import DefaultProfileIcon from "@icons/ic_profile.svg";

const HeaderLoggedOut = () => {
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

const HeaderLoggedIn = ({ profileIconSrc }: HeaderLoggedInProps) => {
  const router = useRouter();
  const { logout } = useAuth();

  async function handleClick() {
    Cookies.remove("accessToken");
    logout();
  }

  return (
    <div className="flex items-center gap-[24px]">
      <LinkButton text="임시 mypage 이동 버튼" link="/mypage" color="green" />
      <Button
        text="임시 로그아웃 버튼"
        color="green"
        type="button"
        onClick={handleClick}
      />
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
  profileIconSrc?: string | StaticImageData;
}

const Header = ({ profileIconSrc }: HeaderProps) => {
  const { isLoggedIn } = useAuth();

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
