"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Eraser,
} from "lucide-react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function PrimaryRichText({
  label,
  value,
  onChange,
  placeholder,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder:
          placeholder || "Digite o conteúdo aqui…",
        emptyEditorClass:
          "text-[#a35c427e] before:content-[attr(data-placeholder)] before:pointer-events-none before:absolute",
      }),
    ],
    content: value || "<p></p>",
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // 🔄 sincronizar quando editar
  useEffect(() => {
    if (!editor) return;

    const currentHTML = editor.getHTML();
    if (value !== currentHTML) {
      editor.commands.setContent(value || "<p></p>");
    }
  }, [value, editor]);

  if (!editor) return null;

  const Button = ({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`p-2 rounded-md transition ${
        active
          ? "bg-[#a35c42]/15 text-[#a35c42]"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col gap-1 relative">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative rounded-xl border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#a35c42]">
        {/* TOOLBAR */}
        <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-200 bg-gray-50">
          <Button
            title="Negrito"
            active={editor.isActive("bold")}
            onClick={() =>
              editor.chain().focus().toggleBold().run()
            }
          >
            <Bold size={16} />
          </Button>

          <Button
            title="Itálico"
            active={editor.isActive("italic")}
            onClick={() =>
              editor.chain().focus().toggleItalic().run()
            }
          >
            <Italic size={16} />
          </Button>

          <Button
            title="Título"
            active={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: 2 })
                .run()
            }
          >
            <Heading2 size={16} />
          </Button>

          <Button
            title="Lista"
            active={editor.isActive("bulletList")}
            onClick={() =>
              editor.chain().focus().toggleBulletList().run()
            }
          >
            <List size={16} />
          </Button>

          <Button
            title="Lista numerada"
            active={editor.isActive("orderedList")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleOrderedList()
                .run()
            }
          >
            <ListOrdered size={16} />
          </Button>

          <Button
            title="Limpar formatação"
            onClick={() =>
              editor
                .chain()
                .focus()
                .clearNodes()
                .unsetAllMarks()
                .run()
            }
          >
            <Eraser size={16} />
          </Button>
        </div>

        {/* EDITOR */}
        <div className="relative p-3 min-h-[80px]">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
