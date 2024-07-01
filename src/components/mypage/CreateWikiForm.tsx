import { useState } from "react";
import Cookies from "js-cookie";
import Button from "@components/Button";
import Input from "@components/Input";
import Toast from "@components/Toast";
import useToast from "@hooks/useToast";
import axios from "@lib/api/axios";

const CreateWikiForm = () => {
  const { toastOpened, showToast } = useToast();
  const [toastText, setToastText] = useState("");
  const [toastColor, setToastColor] = useState("");

  const [values, setValues] = useState({
    securityQuestion: "",
    securityAnswer: "",
  });

  const isFormValid =
    values.securityQuestion !== "" && values.securityAnswer !== "";

  const accessToken = Cookies.get("accessToken"); // 쿠키에 저장해둔 accessToken 불러오기

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { securityQuestion, securityAnswer } = values;

    try {
      const response = await axios.post("profiles", {
        securityQuestion,
        securityAnswer,
      });

      if (response.status === 201) {
        setToastText("위키를 성공적으로 생성하였습니다");
        setToastColor("green");
        showToast();
      } else {
        console.log("다른 상태 코드:", response.status, response.data);
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setToastText("이미 위키가 존재합니다");
        setToastColor("red");
        showToast();
      } else {
        console.error(error.response);
      }
    }
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
          위키 생성하기
        </label>
        <div className="flex flex-col gap-[8px]">
          <Input
            type="text"
            name="securityQuestion"
            value={values.securityQuestion}
            onChange={handleChange}
            placeholder="질문을 입력해 주세요"
          />
          <Input
            type="text"
            name="securityAnswer"
            value={values.securityAnswer}
            onChange={handleChange}
            placeholder="답을 입력해 주세요"
          />
        </div>
      </div>
      <Button
        type="submit"
        text="생성하기"
        color="green"
        className="ml-auto h-[40px] w-[89px]"
        disabled={!isFormValid}
      />
      <Button
        type="submit"
        text="생성하기"
        color="white"
        className="ml-auto h-[40px] w-[89px]"
        disabled={!isFormValid}
      />

      <Toast type={toastColor} isToastOpened={toastOpened}>
        {toastText}
      </Toast>
    </form>
  );
};

export default CreateWikiForm;
