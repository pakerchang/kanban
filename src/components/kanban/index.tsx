import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
// import Task from "./Task";
import Column from "./Column";
import { ColumnType } from "../../utils/enums";

function Kanban() {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 4 }}
      py={10}
      spacing={{ base: 16, md: 4 }}
      rounded="lg"
      overflow="auto"
    >
      <Column column={ColumnType.TO_DO} />
      <Column column={ColumnType.IN_PROGRESS} />
      <Column column={ColumnType.BLOCKED} />
      <Column column={ColumnType.COMPLETED} />
    </SimpleGrid>
  );
}

export default Kanban;
