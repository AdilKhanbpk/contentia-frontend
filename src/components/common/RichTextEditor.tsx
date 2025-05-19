"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { forwardRef, useEffect, useState, useRef } from 'react';
import './RichTextEditor.css';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  // Image functionality removed as per requirements

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter the URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1">
      {/* Text formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        type="button"
        title="Bold"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        type="button"
        title="Italic"
      >
        <em>I</em>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-2 py-1 rounded ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
        type="button"
        title="Strike"
      >
        <s>S</s>
      </button>

      {/* Headings */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
        type="button"
        title="Heading 1"
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
        type="button"
        title="Heading 2"
      >
        H2
      </button>

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
        type="button"
        title="Bullet List"
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-2 py-1 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
        type="button"
        title="Ordered List"
      >
        1. List
      </button>

      {/* Block elements */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-2 py-1 rounded ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
        type="button"
        title="Quote"
      >
        Quote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="px-2 py-1 rounded"
        type="button"
        title="Horizontal Rule"
      >
        Line
      </button>

      {/* Media */}
      <button
        onClick={setLink}
        className={`px-2 py-1 rounded ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
        type="button"
        title="Add Link"
      >
        Link
      </button>

      {/* Undo/Redo */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="px-2 py-1 rounded"
        type="button"
        title="Undo"
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="px-2 py-1 rounded"
        type="button"
        title="Redo"
      >
        Redo
      </button>
    </div>
  );
};

const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(({
  value,
  onChange,
  placeholder = 'Start writing...',
  className = 'w-full border border-gray-400 rounded-lg focus:outline-none overflow-hidden',
  readOnly = false,
}, ref) => {
  // Track if content is being updated programmatically
  const isUpdatingRef = useRef(false);
  // Track if editor is initialized
  const [isEditorReady, setIsEditorReady] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || '',
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      // Only trigger onChange if not updating programmatically
      if (!isUpdatingRef.current) {
        onChange(editor.getHTML());
      }
    },
  });

  // Set editor ready state when editor is initialized
  useEffect(() => {
    if (editor) {
      setIsEditorReady(true);
    }
  }, [editor]);

  // Update content when value prop changes
  useEffect(() => {
    // Only update if editor is ready and value is different
    if (editor && isEditorReady && value !== editor.getHTML()) {
      // Set flag to prevent onChange from being triggered
      isUpdatingRef.current = true;

      // Update content
      editor.commands.setContent(value || '');

      // Reset flag after a short delay
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 10);
    }
  }, [value, editor, isEditorReady]);

  return (
    <div className={className} ref={ref}>
      {!readOnly && <MenuBar editor={editor} />}
      <div className="p-4 min-h-[200px] prose max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;
