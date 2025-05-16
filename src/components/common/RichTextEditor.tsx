"use client";

import { useState, useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import './RichTextEditor.css';

// Define props interface
interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  // For backward compatibility with ReactQuill
  modules?: any;
}

// Create a placeholder component for server-side rendering
const EditorPlaceholder = () => (
  <div className="h-64 w-full bg-gray-100 animate-pulse rounded-md flex items-center justify-center text-gray-500">
    Loading editor...
  </div>
);

// Toolbar button component
const ToolbarButton = ({
  onClick,
  active = false,
  disabled = false,
  children
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-md ${
      active
        ? 'bg-gray-200 text-blue-600'
        : 'text-gray-600 hover:bg-gray-100'
    } ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    }`}
  >
    {children}
  </button>
);

// Toolbar component
const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-300 bg-white rounded-t-lg">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
      >
        <span className="font-bold">B</span>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
      >
        <span className="italic">I</span>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
      >
        <span className="underline">U</span>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
      >
        <span className="line-through">S</span>
      </ToolbarButton>

      <div className="mx-1 border-r border-gray-300"></div>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive('heading', { level: 1 })}
      >
        <span className="font-bold text-lg">H1</span>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
      >
        <span className="font-bold">H2</span>
      </ToolbarButton>

      <div className="mx-1 border-r border-gray-300"></div>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
      >
        • List
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
      >
        1. List
      </ToolbarButton>

      <div className="mx-1 border-r border-gray-300"></div>

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        active={editor.isActive({ textAlign: 'left' })}
      >
        ←
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        active={editor.isActive({ textAlign: 'center' })}
      >
        ↔
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        active={editor.isActive({ textAlign: 'right' })}
      >
        →
      </ToolbarButton>

      <div className="mx-1 border-r border-gray-300"></div>

      <ToolbarButton
        onClick={() => {
          const url = window.prompt('URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        active={editor.isActive('link')}
      >
        Link
      </ToolbarButton>

      <ToolbarButton
        onClick={() => {
          const url = window.prompt('Image URL');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
      >
        Image
      </ToolbarButton>

      <div className="mx-1 border-r border-gray-300"></div>

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        Undo
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        Redo
      </ToolbarButton>
    </div>
  );
};

// The main editor component
const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write something...",
  className = "w-full border border-gray-400 rounded-lg focus:outline-none",
  readOnly = false,
  modules // Ignored in TipTap, but kept for backward compatibility
}: RichTextEditorProps) => {
  const [isClient, setIsClient] = useState(false);
  const [initialContent] = useState(value);

  // Note: The 'modules' prop is ignored in TipTap, but kept for backward compatibility with ReactQuill

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
      TextStyle,
      Color,
      Underline,
    ],
    content: initialContent,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Set content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  // Update editable state when readOnly changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(!readOnly);
    }
  }, [editor, readOnly]);

  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show placeholder during SSR
  if (!isClient) {
    return <EditorPlaceholder />;
  }

  return (
    <div className={className}>
      {!readOnly && editor && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  );
};

// Export as both default and named export for flexibility
export { RichTextEditor };
export default RichTextEditor;
