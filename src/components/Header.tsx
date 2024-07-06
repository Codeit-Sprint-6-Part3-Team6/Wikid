import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import IconButton from "./IconButton";
import NotificationList from "./NotificationList";
import useModal from "@hooks/useModal";
import useNotificationList from "@hooks/useNotificationList";
import useUserInfo from "@hooks/useUserInfo";
import { useAuth } from "@context/AuthContext";
import { getProfile } from "@lib/api/profileApi";
import { getUserInfo } from "@lib/api/userApi";
import { validateImage } from "@lib/validateImage";
import Logo from "@images/image_logo.png";
import AlarmIcon from "@icons/ic_alarm.svg";
import MenuIcon from "@icons/ic_menu.svg";

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
      <div className="absolute -left-[230px] top-[45px] z-50 sm:-left-[250px] lg:-left-[350px]">
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

const ProfileMenu = ({ code }: { code: string | undefined }) => {
  const { logout } = useAuth();

  return (
    <div className="absolute left-[-35px] top-[40px] z-10 flex w-[120px] flex-col items-center gap-[5px] rounded-[10px] border-[0.5px] border-solid border-gray400 bg-white">
      <Link href="/mypage" className="h-[44px] leading-[44px]">
        계정 설정
      </Link>
      {code && (
        <Link href={`wiki/${code}`} className="h-[44px] leading-[44px]">
          내 위키
        </Link>
      )}
      <button onClick={logout} className="h-[44px] leading-[44px]">
        로그아웃
      </button>
    </div>
  );
};

const HeaderLoggedIn = ({ profileIconSrc }: { profileIconSrc: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        />
      </div>
      {isMenuOpen && (
        <div onClick={handleMenuClick}>
          <ProfileMenu code={code} />
        </div>
      )}
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

const MenuLoggedIn = () => {
  const { logout } = useAuth();
  const { user } = useUserInfo();
  const code = user?.profile?.code;

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
      {code && (
        <Link href={`/wiki/${code}`} className="h-[44px] leading-[44px]">
          내 위키
        </Link>
      )}
      <button onClick={logout} className="h-[44px] leading-[44px]">
        로그아웃
      </button>
    </div>
  );
};

const Header = () => {
  const { isLoggedIn } = useAuth();
  const [profileIconSrc, setProfileIconSrc] = useState("/icons/ic_profile.svg");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchProfileImage = useCallback(async () => {
    try {
      if (isLoggedIn) {
        const userInfo = await getUserInfo();
        const code = userInfo.profile?.code;
        if (code) {
          const profile = await getProfile(code);
          const profileImageUrl = validateImage(profile.image);
          setProfileIconSrc(profileImageUrl);
        }
      }
    } catch (error) {
      console.error("이미지를 불러오는데 실패했습니다 ", error);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchProfileImage();
  }, [isLoggedIn]);

  return (
    <div className="sticky top-0 z-40 flex h-[80px] w-full items-center justify-between bg-white pl-[20px] pr-[20px] shadow-md">
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
          className="block h-[32px] w-[32px] md:hidden"
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
