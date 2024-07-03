import { useEffect, useState } from "react";
import { X, LockKeyhole } from "lucide-react";
import Button from "../Button";
import Input from "../Input";
import { Code } from "@lib/types/Profile";

type QuizModalProps = {
  securityQuestion?: string;
  securityAnswer?: string;
  isOpen: boolean;
  handleIsOpen: () => void;
  onClick: (answer: string, code: Code) => Promise<void>;
  code: Code;
};

// 유효성 검사는 나중에 hook이 생기면 Hook으로 교체합니다
// const styleVariants = {
//   basic:
//     "focus:ring-1 w-full rounded-lg bg-[#F7F7FA] p-2 px-5 py-3 text-[#8F95B2]",
//   warning: "w-full rounded-lg p-2 px-5 py-3 text-[#8F95B2] bg-[#FBEDED]",
// };

export default function QuizModal({
  handleIsOpen,
  onClick,
  securityQuestion,
  securityAnswer,
  isOpen,
  code,
}: QuizModalProps) {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [showWarningMessage, setShowWarningMessage] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  // // 유효성 검사는 나중에 hook이 생기면 hook으로 교체합니다.
  // useEffect(() => {
  //   setShowWarningMessage(false);
  // }, [userAnswer]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#474D664D]">
          <div className="flex w-[335px] flex-col rounded-lg bg-white p-5 text-black shadow-2xl backdrop-blur-md sm:min-w-[395px]">
            <header className="flex flex-col items-center gap-3">
              <button
                className="mb-2 place-self-end text-[#8F95B2]"
                onClick={handleIsOpen}
              >
                <X />
              </button>
              <div className="rounded-full bg-[#F7F7FA] p-3 motion-reduce:animate-bounce">
                <LockKeyhole />
              </div>
              <p className="mb-7 text-center text-[#8F95B2]">
                다음 퀴즈를 맞추고 <br />
                위키를 작성해 보세요.
              </p>
            </header>
            <main>
              <form>
                <label
                  htmlFor="security-answer"
                  className="mb-2 block text-xl font-semibold text-[#474D66]"
                >
                  {securityQuestion}
                </label>
                <Input
                  value={userAnswer}
                  onChange={handleInput}
                  placeholder={"답안을 입력해 주세요"}
                  id="security-answer"
                />
                {/* 유효성 검사는 나중에 hook이 생기면 hook으로 교체합니다.
                {showWarningMessage && (
                  <p className="mt-3 text-[12px] text-[#D14343]">
                    정답이 아닙니다. 다시 시도해 주세요.
                  </p>
                )} */}
                <Button
                  onClick={() => onClick(userAnswer, code)}
                  text="확인"
                  color="green"
                  type="button"
                  className="mt-6 h-[40px] w-[355px]"
                />
              </form>
            </main>
            <footer className="mt-5 flex items-center justify-center text-center text-[12px] text-[#8F95B2]">
              위키드는 지인들과 함께하는 즐거운 공간입니다. <br />
              지인에게 상처를 주지 않도록 작성해 주세요.
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
