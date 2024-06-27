import { useEffect, useState } from "react";
import { X, LockKeyhole } from "lucide-react";

type QuizModalProps = {
  securityQuestion: string;
  securityAnswer: string;
  isOpen: boolean;
  handleIsOpen: () => void;
  onClick: () => void;
};

// showWarningMessage값에 따라 input field에 다른 styling을 적용
const styleVariants = {
  basic:
    "focus:ring-1 w-full rounded-lg bg-[#F7F7FA] p-2 px-5 py-3 text-[#8F95B2]",
  warning: "w-full rounded-lg p-2 px-5 py-3 text-[#8F95B2] bg-[#FBEDED]",
};

export default function QuizModal({
  securityQuestion,
  securityAnswer,
  isOpen,
  handleIsOpen,
  onClick,
}: QuizModalProps) {
  const [userAnswer, setUserAnswer] = useState<string | "">("");
  const [showWarningMessage, setShowWarningMessage] = useState<boolean>(false);

  // 정답을 입력하고 버튼을 클릭했을 때 onClick Event를 발생시키거나 WarningMessage를 호출
  const handleSumbit = (e) => {
    e.preventDefault();

    if (userAnswer === securityAnswer) {
      onClick();
    } else {
      setShowWarningMessage(true);
    }
  };
  const handleInput = (e) => {
    setUserAnswer(e.target.value);
  };

  // 정답을 다시 입력하는 경우 showWarningMessage의 상태값을 false로 변경
  useEffect(() => {
    setShowWarningMessage(false);
  }, [userAnswer]);

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
              <form onSubmit={handleSumbit}>
                <label
                  htmlFor="security-answer"
                  className="mb-2 block text-xl font-semibold text-[#474D66]"
                >
                  {securityQuestion}
                </label>
                <input
                  id="security-answer"
                  value={userAnswer}
                  onChange={handleInput}
                  placeholder="답안을 입력해 주세요"
                  className={
                    showWarningMessage
                      ? styleVariants.warning
                      : styleVariants.basic
                  }
                ></input>
                {showWarningMessage && (
                  <p className="mt-3 text-[12px] text-[#D14343]">
                    정답이 아닙니다. 다시 시도해 주세요.
                  </p>
                )}
                <button onClick={onClick} className="mt-6 w-full rounded-xl bg-[#4CBFA4] p-3 text-white">
                  확인
                </button>
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
