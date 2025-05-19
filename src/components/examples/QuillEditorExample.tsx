"use client";

import RichTextEditor from "@/components/common/RichTextEditor";

// Define props interface
interface QuillEditorExampleProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  modules?: any;
  readOnly?: boolean;
}

export default function QuillEditorExample({
  value,
  onChange,
  placeholder = "Type here",
  className,
  modules,
  readOnly
}: QuillEditorExampleProps) {
  // Default modules if none provided
  const defaultModules = {
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
      matchVisual: false
    }
  };

  return (
    <RichTextEditor
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      modules={modules || defaultModules}
      readOnly={readOnly}
    />
  );
}
