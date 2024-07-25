import { useState } from "react";

function useEditorContent(initialContent: string = "") {
  const [content, setContent] = useState(initialContent);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  return { content, setContent, handleContentChange };
}

export default useEditorContent;
