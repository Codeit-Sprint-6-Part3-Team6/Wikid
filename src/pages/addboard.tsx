import { useState } from "react";
import TextEditor from "@components/TextEditor";

function ArticleEditPage() {
  const [content, setContent] = useState("");

  const handleChange = (value: string) => {
    setContent(value);
  };

  return (
    <div>
      <TextEditor type="article" content={content} onChange={handleChange} />
    </div>
  );
}

export default ArticleEditPage;
