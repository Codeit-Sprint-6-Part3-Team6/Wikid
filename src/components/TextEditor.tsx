import { ChangeEventHandler, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import WikiEditorToolbar from "./wikipage/WikiEditorToolbar";

//SSR을 하지 않는 컴포넌트 생성
const QuillNoSSRWrapper = dynamic(async () => await import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

if (typeof window !== "undefined") {
  // 클라이언트 환경에서만 Quill을 임포트
  const Quill = require("quill");
  const icons = Quill.import("ui/icons");
  icons["bold"] = '<img src="/icons/ic_bold.svg" class="h-6 w-6" alt="Bold" />';
  icons["italic"] =
    '<img src="/icons/ic_italic.svg" class="h-6 w-6" alt="Italic" />';
  icons["underline"] =
    '<img src="/icons/ic_underline.svg" class="h-6 w-6" alt="Underline" />';
  icons["list"]["bullet"] =
    '<img src="/icons/ic_bulletList.svg" class="h-6 w-6" alt="bullet" />';
  icons["list"]["ordered"] =
    '<img src="/icons/ic_orderedList.svg" class="h-6 w-6" alt="ordered" />';
  icons["align"][""] =
    '<img src="/icons/ic_alignLeft.svg" class="h-6 w-6" alt="alignLeft" />';
  icons["align"]["center"] =
    '<img src="/icons/ic_alignCenter.svg" class="h-6 w-6" alt="alignCenter" />';
  icons["align"]["right"] =
    '<img src="/icons/ic_alignRight.svg" class="h-6 w-6" alt="alignRight" />';
  icons["align"]["justify"] =
    '<img src="/icons/ic_alignJustify.svg" class="h-6 w-6" alt="alignJustify" />';
  icons["image"] =
    '<img src="/icons/ic_image.svg" class="h-6 w-6" alt="insertImage" />';
  icons["video"] =
    '<img src="/icons/ic_video.svg" class="h-6 w-6" alt="insertVideoLink" />';
  icons["link"] =
    '<img src="/icons/ic_link.svg" class="h-6 w-6" alt="pasteLink" />';
}

const modules = {
  toolbar: {
    container: "#toolbar",
    // container: [
    //   [],
    //   ["bold", "italic", "underline"],
    //   [{ header: [1, 2, 3, 4, 5, 6, false] }],
    //   [{ list: "bullet" }, { list: "ordered" }],
    //   [{ align: [] }],
    //   ["image", "video", "link"],
    // ],
  },
};

function TextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: ChangeEventHandler;
}) {
  // const handleChange = (e) => {
  //   setContent(e.target.value);
  // };

  return (
    <div className="h-[876px] w-[1120px]">
      <WikiEditorToolbar />
      <QuillNoSSRWrapper
        style={{ height: "756px" }}
        theme="snow"
        modules={modules}
        value={content}
        // onChange={handleChange}
      />
    </div>
  );
}

export default TextEditor;
