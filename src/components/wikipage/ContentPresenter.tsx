import DOMPurify from "isomorphic-dompurify";
import Button from "@components/Button";

function ContentPresenter({ content }: { content: string }) {
  return content ? (
    <div
      className="textPresenter text-[16px] leading-[1.42]"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    />
  ) : (
    <div>
      아직 작성된 내용이 없네요.
      <br />
      위키에 참여해 보세요!
      <Button type="button" text="시작하기" color="green" />
    </div>
  );
}

export default ContentPresenter;
