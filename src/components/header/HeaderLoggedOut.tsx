import Link from "next/link";

const HeaderLoggedOut = () => {
  return (
    <div className="hidden md:block">
      <Link href="/login" className="text-[14px] font-normal text-gray600">
        로그인
      </Link>
    </div>
  );
};

export default HeaderLoggedOut;
