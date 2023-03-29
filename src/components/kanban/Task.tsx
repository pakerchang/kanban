import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { TaskModel } from "../../utils/models";
import AutoResizeTextarea from "./AutoResizeTextarea";
import { useTaskDragAndDrop } from "../../hooks/useTaskDragAndDrop";

interface TaskProps {
  index: number;
  task: TaskModel;
  onDelete: (id: TaskModel["id"]) => void;
  onUpdate: (id: TaskModel["id"], updatedTask: TaskModel) => void;
}

function Task(props: TaskProps) {
  const { task, index, onUpdate: handleUpdate, onDelete: handleDelete } = props;
  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({
    task,
    index,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
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
        onChange={handleTitleChange}
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
    </Box>
  );
}

export default Task;
