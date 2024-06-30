import React, { useState } from "react";
import Cookies from "js-cookie";
import Button from "@components/Button";
import Input from "@components/Input";
import axios from "@lib/api/axios";

const ChangePasswordForm = () => {
  const [values, setValues] = useState({
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  });

  const accessToken = Cookies.get("accessToken"); // 쿠키에 저장해둔 accessToken 불러오기

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { currentPassword, password, passwordConfirmation } = values;

    await axios.patch(
      "users/me/password",
      {
        currentPassword,
        password,
        passwordConfirmation,
      },
      {
        headers: {
          // 쿠키에 저장을 한다고 하긴 했는데 자동으로 보내지진 않아서 임의로 추가해주어야 합니다 ㅜ
          Authorization: `Bearer ${accessToken}`, // 헤더에 accessToken 포함해서 보내기
        },
      },
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <form
      className="flex w-[400px] flex-col gap-[16px]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-[10px]">
        <label className="text-[14px] font-normal text-gray500">
          비밀번호 변경
        </label>
        <div className="flex flex-col gap-[8px]">
          <Input
            type="password"
            name="currentPassword"
            value={values.currentPassword}
            placeholder="기존 비밀번호"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            value={values.password}
            placeholder="새 비밀번호"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="passwordConfirmation"
            value={values.passwordConfirmation}
            placeholder="새 비밀번호 확인"
            onChange={handleChange}
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
