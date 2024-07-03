import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";
import IconButton from "./IconButton";
import LinkButton from "./LinkButton";
import NotificationList from "./notification/NotificationList";
import useModal from "@hooks/useModal";
import { getProfile } from "@lib/api/profileApi";
import { getUserInfo } from "@lib/api/userApi";
import Logo from "@images/image_logo.png";
import AlarmIcon from "@icons/ic_alarm.svg";
import MenuIcon from "@icons/ic_menu.svg";
import DefaultProfileIcon from "@icons/ic_profile.svg";

const HeaderLoggedOut = () => {
  return (
    <div className="hidden md:block">
      <Link href="/login" className="text-[14px] font-normal text-gray600">
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
  const [isOpen, handleIsOpen] = useModal();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    window.location.reload(); // 로그인/로그아웃 후, 새로고침 해야 헤더가 변경됨
    router.replace("/login");
  };

  return (
    <div className="hidden md:block">
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
    </div>
  );
};

const MenuLoggedOut = () => {
  return (
    <div className="absolute left-[-80px] top-[40px] flex w-[120px] flex-col items-center gap-[5px] rounded-[10px] border-[0.5px] border-solid border-gray400 bg-white">
      <Link href="/wikilist" className="h-[44px] leading-[44px]">
        위키목록
      </Link>
      <Link href="/boards" className="h-[44px] leading-[44px]">
        자유게시판
      </Link>
      <Link href="/login" className="h-[44px] leading-[44px]">
        로그인
      </Link>
    </div>
  );
};

// 내 위키 링크 수정 필요, 주영님 하실 때 여기도 부탁드려요...
const MenuLoggedIn = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    window.location.reload(); // 로그인/로그아웃 후, 새로고침 해야 헤더가 변경됨
    router.replace("/login");
  };

  return (
    <div className="absolute left-[-80px] top-[40px] flex w-[120px] flex-col items-center gap-[5px] rounded-[10px] border-[0.5px] border-solid border-gray400 bg-white">
      <Link href="/wikilist" className="h-[44px] leading-[44px]">
        위키목록
      </Link>
      <Link href="/boards" className="h-[44px] leading-[44px]">
        자유게시판
      </Link>
      <button className="h-[44px] leading-[44px]">알림</button>
      <Link href="/mypage" className="h-[44px] leading-[44px]">
        마이페이지
      </Link>
      <Link href="/" className="h-[44px] leading-[44px]">
        내 위키
      </Link>
      <button onClick={handleLogout} className="h-[44px] leading-[44px]">
        로그아웃
      </button>
    </div>
  );
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileIconSrc, setProfileIconSrc] = useState<string | undefined>(
    undefined,
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    <div className="shadow-m flex h-[80px] w-full items-center justify-between bg-white pl-[20px] pr-[20px] shadow-md">
      <div className="flex items-center gap-[40px]">
        <Link href="/">
          <Image src={Logo} alt="로고이미지" className="h-[30px] w-[107px]" />
        </Link>
        <Link
          href="/wikilist"
          className="hidden text-[14px] font-normal text-gray800 md:block"
        >
          위키목록
        </Link>
        <Link
          href="/boards"
          className="hidden text-[14px] font-normal text-gray800 md:block"
        >
          자유게시판
        </Link>
      </div>
      <div className="relative flex">
        {isLoggedIn ? (
          <HeaderLoggedIn profileIconSrc={profileIconSrc} />
        ) : (
          <HeaderLoggedOut />
        )}
        <IconButton
          src={MenuIcon}
          alt="메뉴 아이콘"
          className="block h-[24px] w-[24px] md:hidden"
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div onClick={handleMenuClick}>
            {isLoggedIn ? <MenuLoggedIn /> : <MenuLoggedOut />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
