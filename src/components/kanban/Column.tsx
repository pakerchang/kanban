import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import Task from "./task";
import useColumnTasks from "../../hooks/useColumnTask";
import { ColumnType } from "../../utils/enums";
import { TaskModel } from "../../utils/models";
import useColumnDrop from "../../hooks/useColumnDrop";

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: "gray",
  "In Progress": "blue",
  Blocked: "red",
  Completed: "green",
};

function Column({ column }: { column: ColumnType }) {
  const {
    tasks,
    addEmptyTask,
    updateTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
  } = useColumnTasks(column);

  // 這個 component 實際上只會使用到 tasks, addEmptyTask，是否需要將 updateTask, deleteTask, dropTaskFrom, swapTasks
  // 一起宣告並傳遞到 Task component?
  // 我想這問題是關乎資料流追蹤時，是否直覺抑或是看起來比較連貫等閱讀體驗的問題
  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks = tasks.map((task: TaskModel, idx: number) => (
    <Task
      key={task.id}
      task={task}
      index={idx}
      onDelete={deleteTask}
      onUpdate={updateTask}
      onDropHover={swapTasks}
    />
  ));

  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge
          px={2}
          py={1}
          rounded="lg"
          colorScheme={ColumnColorScheme[column]}
        >
          {column}
        </Badge>
      </Heading>

      <Stack
        ref={dropRef}
        direction="column"
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue("gray.50", "gray.900")}
        rounded="lg"
        boxShadow="md"
        overflowY="auto"
      >
        {column === ColumnType.TO_DO && (
          <IconButton
            size="sx"
            w="full"
            color={useColorModeValue("gray.500", "gray.400")}
            bgColor={useColorModeValue("gray.100", "gray.700")}
            _hover={{ bgColor: useColorModeValue("gray.200", "gray.600") }}
            py={2}
            variant="solid"
            colorScheme="black"
            aria-label="add-task"
            icon={<AddIcon />}
            onClick={addEmptyTask}
            opacity={isOver ? 0.85 : 1}
          />
        )}
        {ColumnTasks}
      </Stack>
    </Box>
  );
}

export default Column;
