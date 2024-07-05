import { useState } from "react";
import Button from "@components/Button";
import Input from "@components/Input";
import Toast from "@components/Toast";
import useToast from "@hooks/useToast";
import { createWiki } from "@lib/api/profileApi";

const CreateWikiForm = () => {
  const { toastOpened, showToast } = useToast();
  const [toastText, setToastText] = useState("");
  const [toastColor, setToastColor] = useState("");

  const [values, setValues] = useState({
    securityQuestion: "",
    securityAnswer: "",
  });

  const [errors, setErrors] = useState({
    securityQuestion: false,
    securityAnswer: false,
  });

  const isFormValid =
    values.securityQuestion !== "" && values.securityAnswer !== "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { securityQuestion, securityAnswer } = values;

    try {
      const response = await createWiki({ securityQuestion, securityAnswer });

      if (response.status === 201) {
        setToastText("위키를 생성하였습니다");
        setToastColor("green");
        showToast();
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setToastText("이미 위키가 존재합니다");
        setToastColor("red");
        showToast();
      } else {
        setToastText("위키 생성에 실패하였습니다");
        setToastColor("red");
        showToast();
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      // 길이가 0이면 error, border 빨간색으로
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: true,
      }));
    }
  };

  return (
    <form
      className="flex w-[335px] flex-col gap-[16px] md:w-[400px]"
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
            onBlur={handleBlur}
            placeholder="질문을 입력해 주세요"
            className={`${errors.securityQuestion ? "border-[2px] border-solid border-red-400" : ""}`}
          />
          <Input
            type="text"
            name="securityAnswer"
            value={values.securityAnswer}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="답을 입력해 주세요"
            className={`${errors.securityAnswer ? "border-[2px] border-solid border-red-400" : ""}`}
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
      <Toast type={toastColor} isToastOpened={toastOpened}>
        {toastText}
      </Toast>
    </form>
  );
};

export default CreateWikiForm;
