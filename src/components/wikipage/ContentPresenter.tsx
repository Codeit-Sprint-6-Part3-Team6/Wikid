import DOMPurify from "isomorphic-dompurify";

function ContentPresenter({ content }: { content: string }) {
  return (
    <div
      className="textPresenter text-[16px] leading-[1.42]"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    />
  );
}

export default ContentPresenter;
