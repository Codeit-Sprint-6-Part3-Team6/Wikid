import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";
import IconButton from "./IconButton";
import LinkButton from "./LinkButton";
import { useAuth } from "@context/AuthContext";
import axios from "@lib/api/axios";
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
interface HeaderLoggedInProps {
  // profileIconSrc?: string | StaticImageData;
  profileIconSrc?: string | StaticImageData | undefined;
}
const HeaderLoggedIn = ({ profileIconSrc }: HeaderLoggedInProps) => {
  const router = useRouter();
  async function handleClick() {
    Cookies.remove("accessToken"); // accessToken을 삭제하는 방식으로 로그아웃 구현
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
        unoptimized={true} // 외부 이미지의 경우 최적화를 비활성화
        width={32}
        height={32}
      />
    </div>
  );
};
interface HeaderProps {
  isLoggedIn: boolean;
  profileIconSrc?: string;
}
const Header = () => {
  const isLoggedIn = Cookies.get("accessToken") ? true : false;
  const [profileIconSrc, setProfileIconSrc] = useState<
    string | StaticImageData | undefined
  >(undefined);
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const userInfo = await getUserInfo();
        const code = userInfo?.profile?.code; // 나중에 수정
        if (code) {
          const profile = await getProfile(code);
          const profileImageUrl = profile.image as string;
          setProfileIconSrc(profileImageUrl);
        } else {
          setProfileIconSrc(DefaultProfileIcon);
        }
      } catch (error) {
        console.error("이미지를 불러오는데 실패했습니다 ", error);
        setProfileIconSrc(DefaultProfileIcon);
      }
    };
    fetchProfileImage();
  }, [isLoggedIn]);
  console.log("isLoggedIn: ", isLoggedIn);
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

// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import Image, { StaticImageData } from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import Button from "./Button";
// import IconButton from "./IconButton";
// import LinkButton from "./LinkButton";
// import { useAuth } from "@context/AuthContext";
// import { getProfile } from "@lib/api/profileApi";
// import { getUserInfo } from "@lib/api/userApi";
// import Logo from "@images/image_logo.png";
// import AlarmIcon from "@icons/ic_alarm.svg";
// import DefaultProfileIcon from "@icons/ic_profile.svg";

// const HeaderLoggedOut = () => {
//   return (
//     <div>
//       <Link
//         href="/login"
//         className="text-[14px] font-normal text-[var(--color-gray600)]"
//       >
//         로그인
//       </Link>
//     </div>
//   );
// };

// interface HeaderLoggedInProps {
//   profileIconSrc?: string | StaticImageData;
// }

// const HeaderLoggedIn = ({ profileIconSrc }: HeaderLoggedInProps) => {
//   const { logout } = useAuth();
//   const router = useRouter();

//   const handleClick = () => {
//     Cookies.remove("accessToken");
//     logout();
//     router.reload();
//   };

//   return (
//     <div className="flex items-center gap-[24px]">
//       <LinkButton text="임시 mypage 이동 버튼" link="/mypage" color="green" />
//       <Button
//         text="임시 로그아웃 버튼"
//         color="green"
//         type="button"
//         onClick={handleClick}
//       />
//       <IconButton
//         src={AlarmIcon}
//         alt="알람 아이콘"
//         className="h-[32px] w-[32px]"
//       />
//       <IconButton
//         src={profileIconSrc || DefaultProfileIcon}
//         alt="프로필 아이콘"
//         className="h-[32px] w-[32px] rounded-full"
//         unoptimized={true}
//         width={32}
//         height={32}
//       />
//     </div>
//   );
// };

// const Header = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [profileIconSrc, setProfileIconSrc] = useState<
//     string | StaticImageData | undefined
//   >(undefined);

//   useEffect(() => {
//     const fetchProfileImage = async () => {
//       const token = Cookies.get("accessToken");
//       if (token) {
//         setIsLoggedIn(true);
//         try {
//           const userInfo = await getUserInfo();
//           const code = userInfo?.profile?.code;
//           if (code) {
//             const profile = await getProfile(code);
//             setProfileIconSrc(profile.image as string);
//           } else {
//             setProfileIconSrc(DefaultProfileIcon);
//           }
//         } catch (error) {
//           console.error("이미지를 불러오는데 실패했습니다 ", error);
//           setProfileIconSrc(DefaultProfileIcon);
//         }
//       } else {
//         setIsLoggedIn(false);
//       }
//     };

//     fetchProfileImage();
//   }, []);

//   return (
//     <div className="shadow-m flex h-[80px] w-full items-center justify-between bg-[var(--color-white)] pl-[20px] pr-[20px] shadow-md">
//       <div className="flex items-center gap-[40px]">
//         <Link href="/">
//           <Image src={Logo} alt="로고이미지" className="h-[30px] w-[107px]" />
//         </Link>
//         <Link
//           href="/wikilist"
//           className="text-[14px] font-normal text-[var(--color-gray800)]"
//         >
//           위키목록
//         </Link>
//         <Link
//           href="/boards"
//           className="text-[14px] font-normal text-[var(--color-gray800)]"
//         >
//           자유게시판
//         </Link>
//       </div>
//       {isLoggedIn ? (
//         <HeaderLoggedIn profileIconSrc={profileIconSrc} />
//       ) : (
//         <HeaderLoggedOut />
//       )}
//     </div>
//   );
// };

// export default Header;
