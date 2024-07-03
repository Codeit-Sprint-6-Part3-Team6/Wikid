import Cookies from "cookies";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import LoginForm from "@components/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="mt-[261px] flex flex-col items-center gap-[40px]">
      <LoginForm />
      <Link
        href="/signup"
        passHref
        className="text-[14px] font-normal text-green200 underline decoration-solid"
      >
        회원가입
      </Link>
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
