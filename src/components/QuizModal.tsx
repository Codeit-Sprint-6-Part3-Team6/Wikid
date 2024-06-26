import { useEffect, useState } from "react";
import { X, LockKeyhole } from "lucide-react";

type QuizModalProps = {
  securityQuestion: string;
  securityAnswer: string;
  modalSwitch: boolean;
  toggleModal: () => {};
};

const styleVariants = {
  basic:
    "focus:ring-1 w-full rounded-lg bg-[#F7F7FA] p-2 px-5 py-3 text-[#8F95B2]",
  warning: "w-full rounded-lg p-2 px-5 py-3 text-[#8F95B2] bg-[#FBEDED]",
};

export default function QuizModal({
  securityQuestion,
  securityAnswer,
  modalSwitch,
  toggleModal,
}: QuizModalProps) {
  // modalSwitch를 prop으로 전달받으면, 아래의 modal state 일체를 삭제시키고 modalSwitch로 대체하면 됩니다.
  // return문 가장 첫번째에 있는 modalState도 modalSwitch로 바꿔주세요.
  const [modalState, setModalState] = useState(true);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [warningSwitch, setWarningSwitch] = useState<boolean>(false);

  const handleSumbit = (e) => {
    e.preventDefault();
    if (userAnswer !== securityAnswer) {
      setWarningSwitch(true);
      return;
    } else {
      // userAnswer == securityAnswer일 때 logic을 작성해주세요.
    }
  };

  // toggleModal을 prop으로 받으면, 아래의 handleExitButtonClick을 삭제하고, 해당 버튼의 onClick={toggleModal}으로 설정해주세요.
  const handleExitButtonClick = () => {
    setModalState(!modalState);
  };

  const handleInput = (e) => {
    setUserAnswer(e.target.value);
  };

  useEffect(() => {
    setWarningSwitch(false);
  }, [userAnswer]);

  return (
    <>
      {modalState && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#474D664D]">
          <div className="flex w-[335px] flex-col rounded-lg bg-white p-5 text-black shadow-2xl backdrop-blur-md sm:min-w-[395px]">
            <header className="flex flex-col items-center gap-3">
              <button
                className="mb-2 place-self-end text-[#8F95B2]"
                onClick={handleExitButtonClick}
              >
                <X />
              </button>
              <div className="text-re rounded-full bg-[#F7F7FA] p-3 motion-reduce:animate-bounce">
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
                    warningSwitch ? styleVariants.warning : styleVariants.basic
                  }
                ></input>
                {warningSwitch && (
                  <p className="mt-3 text-[12px] text-[#D14343]">
                    정답이 아닙니다. 다시 시도해 주세요.
                  </p>
                )}
                <button className="mt-6 w-full rounded-xl bg-[#4CBFA4] p-3 text-white">
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
