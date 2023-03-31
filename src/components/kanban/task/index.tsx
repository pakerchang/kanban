import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { TaskModel } from "../../../utils/models";
import { useTaskDragAndDrop } from "../../../hooks/useTaskDragAndDrop";
import AutoResizeTextarea from "../AutoResizeTextarea";
import TaskCotnent from "./TaskContent";

// 需要思考一下邏輯處理的分層
// LocalStorage 的更新是否下放到 TaskCotent 處理, 例如再次呼叫 useColumnTasks
// 但此處需要取捨的是，已經在 Column component 使用過，是否需要拆分，以保證 component 內部的變數都能是在該檔案找到引用處
// 減少檔案間切換的成本，讓閱讀更容易統整範圍，這之中的取捨點又關乎到這麼做是否會讓 hooks 的引用更加碎片化，邏輯依賴過於混亂
interface TaskProps {
  index: number;
  task: TaskModel;
  onDelete: (id: TaskModel["id"]) => void;
  onUpdate: (id: TaskModel["id"], updatedTask: TaskModel) => void;
  onDropHover: (i: number, j: number) => void;
}

function Task(props: TaskProps) {
  const {
    task,
    index,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
    onDropHover: handleDropHover,
  } = props;

  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({
    task,
    index,
    handleDropHover,
  });

  const handleTaskChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    // Rebuild a new task content component, it's structure has title, description and should be editor by tiptap
    // Refactor handleUpdate updated data structure and above
    // handleUpdate(task.id, { ...task, data: newTitle });
    handleUpdate(task.id, { ...task, title: newTitle });
  };

  const handleDeleteClick = () => {
    handleDelete(task.id);
  };

  return (
    <Box
      ref={ref}
      as="div"
      role="group"
      position="relative"
      rounded="lg"
      w={200}
      pt={3}
      pr={3}
      pb={1}
      pl={4}
      boxShadow="xl"
      cursor="grab"
      bgColor={task.color}
      opacity={isDragging ? 0.5 : 1}
    >
      <IconButton
        position="absolute"
        top={0}
        right={0}
        zIndex={100}
        aria-label="delete-task"
        size="md"
        colorScheme="solid"
        color="gray.700"
        icon={<DeleteIcon />}
        opacity={0}
        _groupHover={{
          opacity: 1,
        }}
        onClick={handleDeleteClick}
      />
      <AutoResizeTextarea
        value={task.title}
        onChange={handleTaskChange}
        fontWeight="semibold"
        cursor="inherit"
        p={0}
        resize="none"
        minH={70}
        maxH={200}
        border="none"
        focusBorderColor="none"
        color="gray.700"
        _focus={{
          boxShadow: "none",
        }}
      />
      <TaskCotnent />
    </Box>
  );
}

export default Task;
