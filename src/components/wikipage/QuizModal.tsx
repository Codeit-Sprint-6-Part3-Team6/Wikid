import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import Modal from "@components/Modal";
import Button from "../Button";
import Input from "../Input";
import { Code } from "@lib/types/Profile";

type QuizModalProps = {
  securityQuestion?: string;
  isOpen: boolean;
  handleIsOpen: () => void;
  onClick: (answer: string, code: Code) => Promise<void>;
  code: Code;
  errorMessage: string;
  deleteError: () => void;
};

export default function QuizModal({
  handleIsOpen,
  onClick,
  securityQuestion,
  isOpen,
  code,
  errorMessage,
  deleteError,
}: QuizModalProps) {
  const [userAnswer, setUserAnswer] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
    deleteError();
  };

  return (
    <>
      <Modal isOpen={isOpen} handleIsOpen={handleIsOpen}>
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-[#F7F7FA] p-3 motion-reduce:animate-bounce">
            <LockKeyhole />
          </div>
          <p className="mb-7 text-center text-[#8F95B2]">
            다음 퀴즈를 맞추고 <br />
            위키를 작성해 보세요.
          </p>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onClick(userAnswer, code);
            }}
          >
            <label
              htmlFor="security-answer"
              className="mb-2 block text-xl font-semibold text-[#474D66]"
            >
              {securityQuestion}
            </label>
            <Input
              value={userAnswer}
              onChange={handleChange}
              placeholder={"답안을 입력해 주세요"}
              id="security-answer"
              error={errorMessage}
              onFocus={deleteError}
            />
            <Button
              text="확인"
              color="green"
              type="submit"
              className="mt-6 h-[40px] w-[355px]"
            />
          </form>
        </div>
        <div className="mt-5 flex items-center justify-center text-center text-[12px] text-[#8F95B2]">
          위키드는 지인들과 함께하는 즐거운 공간입니다. <br />
          지인에게 상처를 주지 않도록 작성해 주세요.
        </div>
      </Modal>
    </>
  );
}
