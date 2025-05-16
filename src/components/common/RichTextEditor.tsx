"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import "react-quill/dist/quill.snow.css";

// Define props interface
interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  modules?: any;
  readOnly?: boolean;
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
  modules,
  readOnly = false
}: RichTextEditorProps) => {
  // Create refs and state
  const editorRef = useRef<HTMLDivElement>(null);
  const [quill, setQuill] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [editorId] = useState(`editor-${Math.random().toString(36).substring(2, 9)}`);

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

  // Safely set content
  const safelySetContent = useCallback((editor: any, content: string) => {
    if (!editor) return;

    try {
      // Only update if content is different to avoid cursor jumping
      const currentContent = editor.root.innerHTML;
      if (currentContent !== content) {
        editor.clipboard.dangerouslyPasteHTML(content);
      }
    } catch (error) {
      console.error('Error setting editor content:', error);
    }
  }, []);

  // Initialize Quill on the client side only
  useEffect(() => {
    setIsClient(true);

    // Don't re-initialize if already done
    if (isInitialized) return;

    let quillInstance: any = null;

    const initQuill = async () => {
      if (typeof window !== 'undefined' && editorRef.current) {
        try {
          // Dynamically import Quill only on the client side
          const Quill = (await import('quill')).default;

          // Create container if it doesn't exist
          if (!document.getElementById(editorId)) {
            const container = document.createElement('div');
            container.id = editorId;
            editorRef.current.appendChild(container);
          }

          // Initialize Quill
          quillInstance = new Quill(`#${editorId}`, {
            theme: 'snow',
            placeholder: placeholder,
            modules: modules || defaultModules,
            readOnly: readOnly
          });

          // Set initial content
          if (value) {
            safelySetContent(quillInstance, value);
          }

          // Handle content changes
          quillInstance.on('text-change', () => {
            try {
              const html = quillInstance.root.innerHTML || '';
              onChange(html);
            } catch (error) {
              console.error('Error in text-change handler:', error);
            }
          });

          setQuill(quillInstance);
          setIsInitialized(true);
        } catch (error) {
          console.error('Error initializing Quill:', error);
        }
      }
    };

    initQuill();

    // Cleanup
    return () => {
      if (quillInstance) {
        try {
          // Remove event listeners
          quillInstance.off('text-change');
        } catch (error) {
          console.error('Error cleaning up Quill:', error);
        }
      }
    };
  }, [editorId, isInitialized, modules, onChange, placeholder, readOnly, safelySetContent, value]);

  // Update content when value prop changes
  useEffect(() => {
    if (quill && value !== undefined) {
      safelySetContent(quill, value);
    }
  }, [quill, safelySetContent, value]);

  // Update readOnly state if it changes
  useEffect(() => {
    if (quill) {
      quill.enable(!readOnly);
    }
  }, [quill, readOnly]);

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

// Export as both default and named export for flexibility
export { RichTextEditor };
export default RichTextEditor;
