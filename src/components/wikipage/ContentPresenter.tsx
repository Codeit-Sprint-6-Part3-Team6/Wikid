import DOMPurify from "isomorphic-dompurify";
import Button from "@components/Button";

type ContentPresenterProps = {
  content: string;
  onClick: () => void;
};

function ContentPresenter({ content, onClick }: ContentPresenterProps) {
  return content ? (
    <div
      className="textPresenter text-[16px] leading-[1.42] md:pb-24 lg:pb-36"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    />
  ) : (
    <div className="flex h-48 flex-col items-center justify-center gap-[20px] rounded-[10px] bg-gray50 text-center text-[16px] leading-[26px] text-gray400">
      아직 작성된 내용이 없네요.
      <br />
      위키에 참여해 보세요!
      <Button
        type="button"
        text="시작하기"
        color="green"
        className="px-5 py-2"
        onClick={onClick}
      />
    </div>
  );
}

export default ContentPresenter;
