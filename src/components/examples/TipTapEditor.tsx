"use client";

import { useEffect } from "react";
import RichTextEditor from "@/components/common/RichTextEditor";

// Define props interface
interface TipTapEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}

/**
 * TipTap Rich Text Editor component
 *
 * This component has been updated to use TipTap instead of Quill.
 * It provides a modern, customizable rich text editing experience.
 *
 * Features:
 * - Properly handles content fetched from the database
 * - Supports rich text formatting including headings, lists, and links
 * - Provides a clean, user-friendly interface
 * - Images are intentionally disabled as per requirements
 */
export default function TipTapEditor({
  value,
  onChange,
  placeholder = "Type here",
  className,
  readOnly = false
}: TipTapEditorProps) {
  // Log when content is loaded from database
  useEffect(() => {
    if (value) {
      console.log("Content loaded from database:", value.substring(0, 50) + (value.length > 50 ? "..." : ""));
    }
  }, [value]);

  return (
    <RichTextEditor
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      readOnly={readOnly}
    />
  );
}
