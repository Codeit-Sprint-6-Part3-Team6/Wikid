import { useState } from "react";
import TextEditor from "@components/TextEditor";

function WikiPage() {
  const [content, setContent] = useState("");

  const handleChange = (value: string) => {
    setContent(value);
    console.log(content);
  };

  return (
    <div>
      <TextEditor type="wiki" content={content} onChange={handleChange} />
    </div>
  );
}

export default WikiPage;
