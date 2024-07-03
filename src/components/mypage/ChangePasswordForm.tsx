import React, { useState } from "react";
import Cookies from "js-cookie";
import Button from "@components/Button";
import Input from "@components/Input";
import Toast from "@components/Toast";
import useToast from "@hooks/useToast";
import axios from "@lib/api/axios";
import { patchUserPassword } from "@lib/api/userApi";

const ChangePasswordForm = () => {
  const { toastOpened, showToast } = useToast();
  const [toastText, setToastText] = useState("");
  const [toastColor, setToastColor] = useState("");

  const [values, setValues] = useState({
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { currentPassword, password, passwordConfirmation } = values;

    try {
      const response = await patchUserPassword({
        currentPassword,
        password,
        passwordConfirmation,
      });

      if (response.status === 200) {
        setToastText("비밀번호를 변경하였습니다");
        setToastColor("green");
        showToast();
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setToastText(error.response.data.message);
        setToastColor("red");
        showToast();
      } else {
        setToastText("비밀번호 변경에 실패하였습니다");
        setToastColor("red");
        showToast();
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <form
      className="flex w-[335px] flex-col gap-[16px] md:w-[400px]"
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
      <Toast type={toastColor} isToastOpened={toastOpened}>
        {toastText}
      </Toast>
    </form>
  );
};

export default ChangePasswordForm;
