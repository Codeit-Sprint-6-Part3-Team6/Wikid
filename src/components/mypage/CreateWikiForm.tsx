import { useState } from "react";
import Cookies from "js-cookie";
import Button from "@components/Button";
import Input from "@components/Input";
import axios from "@lib/api/axios";

const CreateWikiForm = () => {
  const [values, setValues] = useState({
    securityQuestion: "",
    securityAnswer: "",
  });

  const accessToken = Cookies.get("accessToken"); // 쿠키에 저장해둔 accessToken 불러오기

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { securityQuestion, securityAnswer } = values;

    await axios.post(
      "profiles",
      {
        securityQuestion,
        securityAnswer,
      },
      {
        headers: {
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
      />
    </form>
  );
};

export default CreateWikiForm;
