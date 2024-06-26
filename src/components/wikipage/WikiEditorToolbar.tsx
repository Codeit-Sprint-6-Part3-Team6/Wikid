function WikiEditorToolbar() {
  return (
    <div
      id="toolbar"
      className="mb-[60px] flex h-[60px] items-center justify-center gap-5 rounded-xl border-8 !border-[var(--color-gray50)] bg-[var(--color-gray50)]"
    >
      <span className="ql-formats !mr-0 !flex gap-5 border-r border-solid border-[var(--color-gray200)]">
        <button className="ql-bold !w-6 !p-0" />
        <button className="ql-italic !w-6 !p-0" />
        <button className="ql-underline !w-6 !p-0" />
      </span>
      <span className="ql-formats !mr-0 !flex gap-5 border-r border-solid border-[var(--color-gray200)]">
        <select
          className="ql-header !w-[64px] !text-base !text-[var(--color-gray400)]"
          defaultValue=""
        >
          <option value="1">제목1</option>
          <option value="2">제목2</option>
          <option value="3">제목3</option>
          <option value="">본문</option>
        </select>
        <button className="ql-list !w-6 !p-0" value="bullet" />
        <button className="ql-list !w-6 !p-0" value="ordered" />
      </span>
      <span className="ql-formats !mr-0 border-r border-solid border-[var(--color-gray200)] pr-5">
        <select className="ql-align !w-6 !p-0" />
      </span>
      <span className="ql-formats !flex gap-5">
        <button className="ql-image !w-6 !p-0" />
        <button className="ql-video !w-6 !p-0" />
        <button className="ql-link !w-6 !p-0" />
      </span>
    </div>
  );
}

export default WikiEditorToolbar;
