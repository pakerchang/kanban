import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// has props then return edit context
// support markdown and parse
function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<h1>Testing Editor</h1>",
  });
  return <EditorContent editor={editor} />;
}

export default Editor;
