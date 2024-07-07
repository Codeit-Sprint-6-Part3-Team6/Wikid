import IconButton from "@components/IconButton";

function ArticleEditorToolbar({ onClick }: { onClick?: () => void }) {
  return (
    <div
      id="toolbar"
      className="mb-3 ml-auto mr-auto mt-3 !flex !h-11 !w-full items-center justify-between overflow-x-scroll rounded-[21.5px] !border-[#e2e8f0] !px-4 !py-[10px] md:overflow-x-visible"
    >
      <div className="flex gap-4">
        <span className="ql-formats !mr-0 !flex gap-1">
          <button className="ql-bold !w-6 !p-0" />
          <button className="ql-italic !w-6 !p-0" />
          <button className="ql-underline !w-6 !p-0" />
        </span>
        <span className="ql-formats !mr-0 !flex gap-1">
          <button className="ql-align !w-6 !p-0" value="" />
          <button className="ql-align !w-6 !p-0" value="center" />
          <button className="ql-align !w-6 !p-0" value="right" />
        </span>
        <span className="ql-formats !mr-0 !flex gap-1">
          <button className="ql-list !w-6 !p-0" value="bullet" />
          <button className="ql-list !w-6 !p-0" value="ordered" />
          <select className="ql-color !w-6 !p-0" />
          <IconButton
            src="/icons/ic_image.svg"
            alt="이미지 업로드"
            onClick={onClick}
            width={24}
            height={24}
          />
        </span>
      </div>
      <span className="ql-formats !mr-0">
        <button className="ql-link !w-6 !p-0" />
      </span>
    </div>
  );
}

export default ArticleEditorToolbar;
