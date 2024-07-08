import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import IconButton from "@components/IconButton";
import AlarmMenu from "./AlarmMenu";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";
import Menu from "./Menu";
import useOutsideClick from "@hooks/useOutsideClick";
import useUserInfo from "@hooks/useUserInfo";
import { useAuth } from "@context/AuthContext";
import { getProfile } from "@lib/api/profileApi";
import { getUserInfo } from "@lib/api/userApi";
import { validateImage } from "@lib/validateImage";
import Logo from "@images/image_logo.png";
import MenuIcon from "@icons/ic_menu.svg";

const Header = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [profileIconSrc, setProfileIconSrc] = useState("/icons/ic_profile.svg");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUserInfo();
  const code = user?.profile?.code;
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const hamburgerMenuRef = useOutsideClick(() => setIsMenuOpen(false));

  const fetchProfileImage = useCallback(async () => {
    try {
      if (isLoggedIn) {
        const userInfo = await getUserInfo();
        const code = userInfo.profile?.code;
        if (code) {
          const profile = await getProfile(code);
          const profileImageUrl = validateImage(profile.image);
          setProfileIconSrc(profileImageUrl);
          return code;
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
          className={`hidden text-[14px] font-normal text-gray800 md:block ${
            router.pathname.startsWith("/wikilist") ||
            router.pathname.startsWith("/wiki")
              ? "font-semibold text-green200"
              : ""
          }`}
        >
          위키목록
        </Link>
        <Link
          href="/boards"
          className={`hidden text-[14px] font-normal text-gray800 md:block ${
            router.pathname.startsWith("/boards") ||
            router.pathname === "/addboard"
              ? "font-semibold text-green200"
              : ""
          }`}
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
        <div ref={hamburgerMenuRef} className="flex items-center">
          <IconButton
            src={MenuIcon}
            alt="메뉴 아이콘"
            className="block h-[32px] w-[32px] md:hidden"
            onClick={toggleMenu}
          />
        </div>
        {isMenuOpen && (
          <div className="relative">
            <Menu isLoggedIn={isLoggedIn} code={code} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
