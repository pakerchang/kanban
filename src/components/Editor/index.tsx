import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<h1>Testing Editor</h1>",
  });
  return <EditorContent editor={editor} />;
}

export default Editor;
