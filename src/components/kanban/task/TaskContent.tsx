import Editor from "./Editor";

function TaskContent() {
  // Strcture Cotnent {
  // title: string
  // desc: stirng | React.Node | HTMLElement : It should support markdown
  // }
  return (
    <div>
      <Editor />
    </div>
  );
}

export default TaskContent;
