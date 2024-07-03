import { useEffect, useState } from "react";
import Button from "@components/Button";
import LinkButton from "@components/LinkButton";
import useWindowResize from "@hooks/useWindowResize";
import { getUserInfo } from "@lib/api/userApi";

type AccountMenu = {
  isOpen: boolean;
  handleLogout: () => {};
};

export default function AccountMenu({ isOpen, handleLogout }) {
  const [userCode, setUserCode] = useState();
  const { width } = useWindowResize();

  useEffect(() => {
    const getUserCode = async () => {
      const userInfo = await getUserInfo();
      const code = userInfo?.profile?.code;
      setUserCode(code);
    };

    console.log(width);

    getUserCode();
  }, []);

  return (
    <>
      {isOpen && (
        <div className="bg-white m-10 flex w-[130px] flex-col items-center justify-center gap-[20px] px-[29px] py-[13px] text-[14px] text-[#474D66] shadow-lg">
          {width > 375 ? (
            <AccounMenuDesktop
              userCode={userCode}
              handleLogout={handleLogout}
            />
          ) : (
            <AccountMenuMobile handleLogout={handleLogout} />
          )}
        </div>
      )}
    </>
  );
}

type AccounMenuDesktopProps = {
  userCode: string;
  handleLogout: () => {};
};

const AccounMenuDesktop = ({ userCode, handleLogout }) => {
  return (
    <>
      <LinkButton text="계정 설정" link="/mypage" color="white" />
      <LinkButton text="내 위키" link={`/wiki/${userCode}`} color="white" />
      <Button
        color="white"
        text="로그아웃"
        className="border-none"
        type="button"
        onClick={handleLogout}
      />
    </>
  );
};

type AccountMenuMobileProps = {
  handleLogout: () => {};
};

const AccountMenuMobile = ({ handleLogout }) => {
  return (
    <>
      <LinkButton
        text="위키 목록"
        link="/wikilist"
        color="white"
        className="w-full"
      />
      <LinkButton
        text="자유게시판"
        link="/boards"
        color="white"
        className="w-full"
      />
      <Button
        color="white"
        text="알림"
        type="button"
        className="border-none"
        onClick={handleLogout}
      />
      <LinkButton text="마이 페이지" link="/mypage" color="white" />
    </>
  );
};
