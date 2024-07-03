import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";
import IconButton from "./IconButton";
import LinkButton from "./LinkButton";
import { getProfile } from "@lib/api/profileApi";
import { getUserInfo } from "@lib/api/userApi";
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

const HeaderLoggedIn = ({
  profileIconSrc,
}: {
  profileIconSrc: string | undefined;
}) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    window.location.reload(); // 로그인/로그아웃 후, 새로고침 해야 헤더가 변경됨
    router.replace("/login");
  };

  return (
    <div className="flex items-center gap-[24px]">
      <LinkButton text="임시 mypage 이동 버튼" link="/mypage" color="green" />
      <Button
        text="임시 로그아웃 버튼"
        color="green"
        type="button"
        onClick={handleLogout}
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
        unoptimized={true}
        width={32}
        height={32}
      />
    </div>
  );
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileIconSrc, setProfileIconSrc] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = Cookies.get("accessToken");
      setIsLoggedIn(!!accessToken);
      return !!accessToken;
    };

    const fetchProfileImage = async () => {
      try {
        const loggedIn = checkLoginStatus();
        if (loggedIn) {
          const userInfo = await getUserInfo();
          const code = userInfo?.profile?.code;
          if (code) {
            const profile = await getProfile(code);
            const profileImageUrl = profile.image as string;
            setProfileIconSrc(profileImageUrl);
          } else {
            setProfileIconSrc(DefaultProfileIcon);
          }
        }
      } catch (error) {
        console.error("이미지를 불러오는데 실패했습니다 ", error);
        setProfileIconSrc(DefaultProfileIcon);
      }
    };

    fetchProfileImage();
  }, []);

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
