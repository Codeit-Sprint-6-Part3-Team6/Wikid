import Cookies from "cookies";
import { GetServerSideProps } from "next";
import ChangePasswordForm from "@components/mypage/ChangePasswordForm";
import CreateWikiForm from "@components/mypage/CreateWikiForm";

const SettingPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-[64px] pb-[30px] pt-[30px]"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <h1 className="text-[24px] font-semibold text-gray500">계정 설정</h1>
      <ChangePasswordForm />
      <hr className="w-[400px] border-t-[1px] border-solid border-gray200" />
      <CreateWikiForm />
    </div>
  );
};

export default SettingPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const cookies = new Cookies(req, res);
  const accessToken = cookies.get("accessToken");

  if (!accessToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
