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
  // State to track client-side rendering
  const [mounted, setMounted] = useState(false);

  // Refs for DOM elements and Quill instance
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  // Flag to prevent onChange loops
  const isUpdatingRef = useRef(false);

  // Initialize Quill on the client side only
  useEffect(() => {
    // Mark as mounted on client
    setMounted(true);

    // Only run on client side
    if (typeof window === 'undefined') return;

    // Dynamically import Quill
    const initQuill = async () => {
      try {
        // Import Quill dynamically
        const QuillModule = await import('quill');
        const Quill = QuillModule.default;

        // Make sure we have a DOM element to attach to
        if (!editorRef.current) return;

        // Create Quill instance
        const quillInstance = new Quill(editorRef.current, {
          theme: 'snow',
          placeholder: placeholder,
          modules: modules || defaultModules,
          readOnly: readOnly,
        });

        // Store the instance in ref
        quillRef.current = quillInstance;

        // Set initial content if provided
        if (value) {
          isUpdatingRef.current = true;
          quillInstance.clipboard.dangerouslyPasteHTML(value);
          isUpdatingRef.current = false;
        }

        // Handle content changes
        quillInstance.on('text-change', () => {
          if (isUpdatingRef.current) return;

          const html = editorRef.current?.querySelector('.ql-editor')?.innerHTML || '';
          onChange(html);
        });
      } catch (error) {
        console.error('Error initializing Quill:', error);
      }
    };

    // Initialize Quill
    initQuill();

    // Cleanup function
    return () => {
      if (quillRef.current) {
        // Remove all event listeners
        quillRef.current.off('text-change');
        quillRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run once on mount

  // Update content when value prop changes
  useEffect(() => {
    // Skip if not mounted or no Quill instance
    if (!mounted || !quillRef.current) return;

    const quill = quillRef.current;
    const currentContent = editorRef.current?.querySelector('.ql-editor')?.innerHTML || '';

    // Only update if content is different to avoid loops
    if (value !== currentContent && value !== undefined) {
      isUpdatingRef.current = true;
      quill.clipboard.dangerouslyPasteHTML(value || '');

      // Reset the flag after a short delay
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 10);
    }
  }, [value, mounted]);

  // Update Quill options when they change
  useEffect(() => {
    if (!mounted || !quillRef.current) return;

    // Update placeholder
    if (quillRef.current.root) {
      quillRef.current.root.dataset.placeholder = placeholder;
    }

    // Update readOnly state
    quillRef.current.enable(!readOnly);

  }, [placeholder, readOnly, mounted]);

  // Show placeholder during SSR
  if (!mounted) {
    return <EditorPlaceholder />;
  }

  return (
    <div ref={containerRef} className={className}>
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
