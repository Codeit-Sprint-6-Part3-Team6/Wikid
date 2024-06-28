import Button from "@components/Button";

const LoginForm: React.FC = () => {
  return (
    <>
      <h1>로그인</h1>
      <p>push test</p>
      <Button
        text="로그인"
        color="green"
        className="h-[45px] w-[400px]"
        type="button"
      />
    </>
  );
};

export default LoginForm;
