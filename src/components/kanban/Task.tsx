import React, { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Textarea } from "@chakra-ui/react";
import { TaskModel } from "../../utils/models";

interface TaskProps {
  index: number;
  task: TaskModel;
}

function Task(props: TaskProps) {
  const { task } = props;
  const [value, setValue] = useState(task.title || "");

  return (
    <Box
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
      />
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fontWeight="semibold"
        cursor="inherit"
        border="none"
        p={0}
        minH={70}
        maxH={200}
        focusBorderColor="none"
        color="gray.700"
      />
    </Box>
  );
}

export default Task;
