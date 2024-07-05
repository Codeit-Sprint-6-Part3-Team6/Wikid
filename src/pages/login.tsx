import Cookies from "cookies";
import { GetServerSideProps } from "next";
import Link from "next/link";
import LoginForm from "@components/login/LoginForm";

const LoginPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-[40px] pb-[30px] pt-[30px]"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <LoginForm />
      <div className="flex gap-[10px]">
        <p className="text-[14px] font-normal text-gray400">
          회원이 아니신가요?
        </p>
        <Link
          href="/signup"
          passHref
          className="text-[14px] font-normal text-green200 underline decoration-solid"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const cookies = new Cookies(req, res);
  const accessToken = cookies.get("accessToken");

  if (accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
