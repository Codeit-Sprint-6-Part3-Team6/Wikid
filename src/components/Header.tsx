import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import IconButton from "./IconButton";
import NotificationList from "./notification/NotificationList";
import useIsLoggedIn from "@hooks/useIsLoggedIn";
import useModal from "@hooks/useModal";
import useNotificationList from "@hooks/useNotificationList";
import { useAuth } from "@context/AuthContext";
import { getProfile } from "@lib/api/profileApi";
import { getUserInfo } from "@lib/api/userApi";
import Logo from "@images/image_logo.png";
import AlarmIcon from "@icons/ic_alarm.svg";
import MenuIcon from "@icons/ic_menu.svg";
import DefaultProfileIcon from "@icons/ic_profile.svg";

const AlarmMenu = () => {
  const [isOpen, handleIsOpen] = useModal();
  const { notificationList, totalCount, handleDeleteClick } =
    useNotificationList(isOpen);

  return (
    <>
      <IconButton
        src={AlarmIcon}
        alt="알람 아이콘"
        className={`h-[32px] w-[32px] ${totalCount ? "animate-pulse" : ""}`}
        totalCount={totalCount}
        onClick={handleIsOpen}
      />
      <div className="absolute -left-[230px] top-[45px] sm:-left-[250px] lg:-left-[350px]">
        <NotificationList
          isOpen={isOpen}
          handleIsOpen={handleIsOpen}
          notificationList={notificationList}
          totalCount={totalCount}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </>
  );
};

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
  const [isOpen, handleIsOpen] = useModal();

  return (
    <div className="hidden md:block">
      <div className="flex items-center gap-[20px]">
        <AlarmMenu />
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
    <div className="absolute left-[-90px] top-[40px] z-10 flex w-[120px] flex-col items-center gap-[5px] rounded-[10px] border-[0.5px] border-solid border-gray400 bg-white">
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
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="absolute left-[-45px] top-[40px] z-10 flex w-[120px] flex-col items-center gap-[5px] rounded-[10px] border-[0.5px] border-solid border-gray400 bg-white">
      <Link href="/wikilist" className="h-[44px] leading-[44px]">
        위키목록
      </Link>
      <Link href="/boards" className="h-[44px] leading-[44px]">
        자유게시판
      </Link>
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
  const { isLoggedIn } = useIsLoggedIn();
  const [profileIconSrc, setProfileIconSrc] = useState<string | undefined>(
    undefined,
  );
  // const profileIconRef = useRef(undefined); // const profileIcon = undefined;
  // profileIconRef.current; // = undefined

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        if (isLoggedIn) {
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
  }, [isLoggedIn]);

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
          <div className="flex flex-row items-center">
            <div className="mr-[15px] block md:hidden">
              <AlarmMenu />
            </div>
            <HeaderLoggedIn profileIconSrc={profileIconSrc} />
          </div>
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
