"use client";

import { useEffect, useState, useRef } from "react";
import "react-quill/dist/quill.snow.css";

// Define props interface
interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  modules?: any;
}

// Placeholder for server-side rendering
const EditorPlaceholder = () => (
  <div className="h-64 w-full bg-gray-100 animate-pulse rounded-md flex items-center justify-center text-gray-500">
    Loading editor...
  </div>
);

// Default modules configuration
const defaultModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Type here",
  className = "w-full border border-gray-400 rounded-lg focus:outline-none",
  readOnly = false,
  modules = defaultModules,
}: RichTextEditorProps) => {
  const [isClient, setIsClient] = useState(false);
  const [quillInstance, setQuillInstance] = useState<any>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Initialize Quill on the client side
  useEffect(() => {
    setIsClient(true);

    // Only initialize Quill if it hasn't been initialized yet
    if (typeof window !== 'undefined' && !quillInstance) {
      // Import Quill dynamically to avoid SSR issues
      import('quill').then((Quill) => {
        // Make sure the ref is still valid and component is still mounted
        if (!editorRef.current) return;

        // Create a new Quill instance
        const quill = new Quill.default(editorRef.current, {
          theme: 'snow',
          placeholder: placeholder,
          modules: modules,
          readOnly: readOnly,
        });

        // Set initial content
        if (value) {
          quill.clipboard.dangerouslyPasteHTML(value);
        }

        // Handle content changes
        quill.on('text-change', () => {
          const html = editorRef.current?.querySelector('.ql-editor')?.innerHTML || '';
          onChange(html);
        });

        setQuillInstance(quill);
      }).catch(error => {
        console.error('Error loading Quill:', error);
      });
    }

    // Cleanup function
    return () => {
      if (quillInstance) {
        // Clean up Quill instance if needed
        setQuillInstance(null);
      }
    };
  }, [placeholder, modules, readOnly, value, onChange]);

  // Update content when value prop changes from outside
  useEffect(() => {
    if (quillInstance && value !== undefined) {
      const currentContent = editorRef.current?.querySelector('.ql-editor')?.innerHTML;
      // Only update if the content is different to avoid infinite loops
      if (currentContent !== value && currentContent !== '<p><br></p>' && value !== '') {
        // Temporarily remove the text-change handler to avoid triggering onChange
        const textChangeHandler = quillInstance.listeners['text-change'];
        quillInstance.off('text-change');

        // Update the content
        quillInstance.clipboard.dangerouslyPasteHTML(value);

        // Re-attach the text-change handler
        setTimeout(() => {
          if (textChangeHandler) {
            quillInstance.on('text-change', textChangeHandler[0]);
          }
        }, 0);
      }
    }
  }, [value, quillInstance]);

  // Show placeholder during SSR
  if (!isClient) {
    return <EditorPlaceholder />;
  }

  return (
    <div className={className}>
      <div
        ref={editorRef}
        className="prose max-w-none min-h-[200px]"
      />
    </div>
  );
};

// Export as both default and named export for flexibility
export { RichTextEditor };
export default RichTextEditor;
