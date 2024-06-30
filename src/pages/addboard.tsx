import { useState } from "react";
import Link from "next/link";
import TextEditor from "@components/TextEditor";

function ArticleEditPage() {
  const [content, setContent] = useState("");

  const handleChange = (value: string) => {
    setContent(value);
  };

  return (
    <div>
      <Link href="/wiki/726f196f-b9e0-42ab-ba9c-4305aac71719">링크</Link>
      <TextEditor type="article" content={content} onChange={handleChange} />
    </div>
  );
}

export default ArticleEditPage;
