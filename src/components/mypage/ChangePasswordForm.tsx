import Button from "@components/Button";
import Input from "@components/Input";

const ChangePasswordForm = () => {
  return (
    <form className="flex w-[400px] flex-col gap-[10px]">
      <div className="flex flex-col gap-[10px]">
        <label>비밀번호 변경</label>
        <div className="flex flex-col gap-[8px]">
          <Input
            type="password"
            name="formerPassword"
            // value="formerPassword"
            placeholder="기존 비밀번호"
          />
          <Input
            type="password"
            name="newPassword"
            // value="newPassword"
            placeholder="새 비밀번호"
          />
          <Input
            type="password"
            name="newPassword"
            // value="newPassword"
            placeholder="새 비밀번호 확인"
          />
        </div>
      </div>
      <Button
        type="submit"
        text="변경하기"
        color="green"
        className="ml-auto h-[40px] w-[89px]"
      />
    </form>
  );
};

export default ChangePasswordForm;
