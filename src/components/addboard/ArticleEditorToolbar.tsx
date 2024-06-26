function ArticleEditorToolbar() {
  return (
    <div
      id="toolbar"
      className="ml-auto mr-auto !flex !h-11 !w-[1000px] items-center justify-between rounded-[21.5px] !border-[#e2e8f0] !px-4 !py-[10px]"
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
          <button className="ql-image !w-6 !p-0" />
        </span>
      </div>
      <span className="ql-formats !mr-0">
        <button className="ql-link !w-6 !p-0" />
      </span>
    </div>
  );
}

export default ArticleEditorToolbar;
