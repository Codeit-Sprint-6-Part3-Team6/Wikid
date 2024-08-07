import Link from "next/link";
import { useAuth } from "@context/AuthContext";

type MenuProps = {
  isLoggedIn: boolean;
  code?: string;
};

const Menu = ({ isLoggedIn, code }: MenuProps) => {
  const { logout } = useAuth();

  return (
    <div className="absolute left-[-110px] top-[40px] z-10 flex w-[120px] flex-col items-center gap-[5px] rounded-[10px] border-[0.5px] border-solid border-gray400 bg-white text-center">
      <Link href="/wiki" className="h-[44px] w-full leading-[44px] hover:scale-105">
        위키목록
      </Link>
      <Link href="/boards" className="h-[44px] w-full leading-[44px] hover:scale-105">
        자유게시판
      </Link>
      {isLoggedIn ? (
        <>
          <Link href="/mypage" className="h-[44px] w-full leading-[44px] hover:scale-105">
            마이페이지
          </Link>
          {code && (
            <Link href={`/wiki/${code}`} className="h-[44px] w-full leading-[44px] hover:scale-105">
              내 위키
            </Link>
          )}
          <button onClick={logout} className="h-[44px] w-full leading-[44px] hover:scale-105">
            로그아웃
          </button>
        </>
      ) : (
        <Link href="/login" className="h-[44px] w-full leading-[44px] hover:scale-105">
          로그인
        </Link>
      )}
    </div>
  );
};

export default Menu;
