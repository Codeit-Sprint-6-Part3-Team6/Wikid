import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import ArticleEditorToolbar from "./addboard/ArticleEditorToolbar";
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
  icons["color"] =
    '<img src="/icons/ic_coloring.svg" class="h-6 w-6" alt="coloring" />';
}

const modules = {
  toolbar: {
    container: "#toolbar",
  },
};

const wikiFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "size",
  "align",
  "image",
  "video",
  "link",
];

const articleFormats = [
  "bold",
  "italic",
  "underline",
  "align",
  "list",
  "image",
  "color",
  "link",
];

interface TextEditorProps {
  type: string;
  name?: string;
  content?: string;
  className?: string;
  onChange: (value: string) => void;
}

function TextEditor({
  type,
  name,
  className,
  content = "",
  onChange,
}: TextEditorProps) {
  return (
    <div
      className={`flex flex-col justify-center ${type} ${className} w-full min-w-[800px] ${type === "article" ? "px-[30px]" : ""}`} //!w-[${type === "wiki" ? 1120 : 1060}px]
    >
      {type === "wiki" && name && <WikiEditorToolbar />}
      <QuillNoSSRWrapper
        style={{ width: "100%", height: "100%", overflow: "auto" }}
        theme="snow"
        placeholder={`${type === "wiki" ? "추천 헤더 : 개요, 취미, 취향, 여담" : "본문을 입력해주세요"}`}
        modules={modules}
        formats={type === "wiki" ? wikiFormats : articleFormats}
        value={content}
        onChange={onChange}
      />
      {type === "article" && <ArticleEditorToolbar />}
    </div>
  );
}

export default TextEditor;
