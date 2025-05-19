"use client";

import { useState } from "react";
import RichTextEditor from "@/components/common/RichTextEditor";

export default function QuillEditorExample() {
  const [text, setText] = useState("");

  const onChange = (content: string) => {
    setText(content);
  };

  // Define custom modules if needed (similar to your example)
  const customModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image", "video"],
      ["clean"]
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    }
  };

  // Ready to use the editor

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quill Editor Example</h1>

      <RichTextEditor
        value={text}
        onChange={onChange}
        placeholder="Type here"
        modules={customModules}
      />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Editor Content Preview:</h2>
        <div
          className="p-4 border rounded bg-gray-50"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
}
