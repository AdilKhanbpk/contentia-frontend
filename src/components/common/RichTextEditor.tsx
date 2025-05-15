"use client";

import { useEffect, useState, useRef } from "react";
import "react-quill/dist/quill.snow.css";

// Define props interface
interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  modules?: any;
}

// Create a placeholder component for server-side rendering
const EditorPlaceholder = () => (
  <div className="h-64 w-full bg-gray-100 animate-pulse rounded-md flex items-center justify-center text-gray-500">
    Loading editor...
  </div>
);

// The main editor component
const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write something...",
  className = "w-full border border-gray-400 rounded-lg focus:outline-none",
  modules
}: RichTextEditorProps) => {
  // Create refs and state
  const editorRef = useRef<HTMLDivElement>(null);
  const [quill, setQuill] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  // Default modules configuration
  const defaultModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  // Initialize Quill on the client side only
  useEffect(() => {
    setIsClient(true);

    if (typeof window !== 'undefined') {
      // Dynamically import Quill only on the client side
      import('quill').then((Quill) => {
        if (!quill && editorRef.current) {
          const editor = new Quill.default(editorRef.current, {
            theme: 'snow',
            placeholder: placeholder,
            modules: modules || defaultModules
          });

          // Set initial content
          if (value) {
            editor.clipboard.dangerouslyPasteHTML(value);
          }

          // Handle content changes
          editor.on('text-change', () => {
            const html = editorRef.current?.querySelector('.ql-editor')?.innerHTML || '';
            onChange(html);
          });

          setQuill(editor);
        }
      });
    }

    // Cleanup
    return () => {
      if (quill) {
        // Clean up Quill instance if needed
      }
    };
  }, []);

  // Update content when value prop changes
  useEffect(() => {
    if (quill && value !== undefined && editorRef.current?.querySelector('.ql-editor')?.innerHTML !== value) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }
  }, [value, quill]);

  // Show placeholder during SSR or while loading
  if (!isClient) {
    return <EditorPlaceholder />;
  }

  // Render the editor container
  return (
    <div className={className}>
      <div ref={editorRef} className="min-h-[200px]"></div>
    </div>
  );
};

export default RichTextEditor;
