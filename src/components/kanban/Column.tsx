import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import Task from "./Task";
import useColumnTasks from "../../hooks/useColumnTask";
import { ColumnType } from "../../utils/enums";

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: "gray",
  "In Progress": "blue",
  Blocked: "red",
  Completed: "green",
};

function Column({ column }: { column: ColumnType }) {
  const { tasks, addEmptyTask } = useColumnTasks(column);
  const ColumnTasks = tasks.map((task, idx) => (
    <Task key={task.id} task={task} index={idx} />
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
        direction={{ base: "row", md: "column" }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue("gray.50", "gray.900")}
        rounded="lg"
        boxShadow="md"
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
          />
        )}
        {ColumnTasks}
      </Stack>
    </Box>
  );
}

export default Column;
