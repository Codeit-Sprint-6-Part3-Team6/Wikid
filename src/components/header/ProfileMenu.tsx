import Link from "next/link";
import { useAuth } from "@context/AuthContext";

type ProfileMenuProps = {
  code: string | undefined;
};

const ProfileMenu = ({ code }: ProfileMenuProps) => {
  const { logout } = useAuth();

  return (
    <div className="absolute left-[-35px] top-[40px] z-10 flex w-[120px] flex-col items-center gap-[5px] rounded-[10px] border-[0.5px] border-solid border-gray400 bg-white">
      <Link
        href="/mypage"
        className="h-[44px] w-full text-center leading-[44px] hover:scale-105"
      >
        계정 설정
      </Link>
      {code && (
        <Link
          href={`wiki/${code}`}
          className="h-[44px] w-full text-center leading-[44px] hover:scale-105"
        >
          내 위키
        </Link>
      )}
      <button
        onClick={logout}
        className="h-[44px] w-full leading-[44px] hover:scale-105"
      >
        로그아웃
      </button>
    </div>
  );
};

export default ProfileMenu;
