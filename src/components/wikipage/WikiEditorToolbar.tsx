import IconButton from "@components/IconButton";

function WikiEditorToolbar({ onClick }: { onClick?: () => void }) {
  return (
    <div
      id="toolbar"
      className="relative mb-8 flex h-[60px] items-center gap-5 rounded-xl border-8 !border-[var(--color-gray50)] bg-[var(--color-gray50)] !px-5 md:justify-center md:p-0"
    >
      <span className="ql-formats !mr-0 !flex gap-5 border-r border-solid border-[var(--color-gray200)] pr-5">
        <button className="ql-bold !w-6 !p-0" />
        <button className="ql-italic !w-6 !p-0" />
        <button className="ql-underline !w-6 !p-0" />
      </span>
      <span className="ql-formats !mr-0 border-r border-solid border-[var(--color-gray200)] pr-5">
        <select
          className="ql-header !w-[64px] !text-base !text-[var(--color-gray400)]"
          defaultValue=""
        >
          <option value="1">제목1</option>
          <option value="2">제목2</option>
          <option value="3">제목3</option>
          <option value="">본문</option>
        </select>
      </span>
      <span className="ql-formats !mr-0 border-r border-solid border-[var(--color-gray200)] pr-5">
        <select
          className="ql-size !w-[80px] !text-base !text-[var(--color-gray400)]"
          defaultValue=""
        >
          <option value="small">작은 글씨</option>
          <option value="">기본 글씨</option>
          <option value="large">중간 글씨</option>
          <option value="huge">큰 글씨</option>
        </select>
      </span>
      <span className="ql-formats !mr-0 border-r border-solid border-[var(--color-gray200)] pr-5">
        <select className="ql-align !w-6 !p-0" />
      </span>
      <span className="ql-formats !mr-0 !flex flex-shrink-0 gap-5">
        <IconButton
          src="/icons/ic_image.svg"
          alt="이미지 업로드"
          onClick={onClick}
          width={24}
          height={24}
        />
        <button className="ql-video !w-6 !p-0" />
        <button className="ql-link !w-6 !p-0" />
      </span>
    </div>
  );
}

export default WikiEditorToolbar;
