import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import IconButton from "@components/IconButton";
import AlarmMenu from "./AlarmMenu";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";
import Menu from "./Menu";
import useApiRequest from "@hooks/useApiRequest";
import useOutsideClick from "@hooks/useOutsideClick";
import { useAuth } from "@context/AuthContext";
import { getProfile } from "@lib/api/profileApi";
import { Code, Profile } from "@lib/types/Profile";
import { validateImage } from "@lib/validateImage";
import Logo from "@images/image_logo.png";
import MenuIcon from "@icons/ic_menu.svg";

const Header = () => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const [profileIconSrc, setProfileIconSrc] = useState("/icons/ic_profile.svg");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const { data: profile, toggleTrigger: triggerGetProfile } = useApiRequest<
    (code: Code) => Promise<Profile>,
    Profile,
    string
  >(getProfile, user?.profile?.code, false, () => {
    if (profile?.image) {
      const profileImageUrl = validateImage(profile.image);
      setProfileIconSrc(profileImageUrl);
    }
  });

  const hamburgerMenuRef = useOutsideClick<HTMLButtonElement>(() => setIsMenuOpen(false));

  useEffect(() => {
    if (isLoggedIn && user?.profile) {
      triggerGetProfile();
    }
  }, [isLoggedIn, user]);

  return (
    <div className="sticky top-0 z-40 flex h-[80px] w-full items-center justify-between bg-white pl-[20px] pr-[20px] shadow-md">
      <div className="flex items-center gap-[40px]">
        <Link href="/">
          <Image src={Logo} alt="로고이미지" className="h-[30px] w-[107px]" />
        </Link>
        <Link
          href="/wiki"
          className={`hidden text-[14px] font-normal text-gray800 md:block ${
            router.pathname.startsWith("/wiki") ? "font-semibold text-green200" : ""
          }`}
        >
          위키목록
        </Link>
        <Link
          href="/boards"
          className={`hidden text-[14px] font-normal text-gray800 md:block ${
            router.pathname.startsWith("/boards") || router.pathname === "/addboard"
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
        <IconButton
          src={MenuIcon}
          alt="메뉴 아이콘"
          className="block h-[32px] w-[32px] md:hidden"
          onClick={toggleMenu}
          menuRef={hamburgerMenuRef}
        />
        {isMenuOpen && (
          <div className="relative">
            <Menu isLoggedIn={isLoggedIn} code={user?.profile.code} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
