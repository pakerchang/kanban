import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { ColumnType } from "@/utils/enums";
import { TaskModel } from "@/utils/models";
import useTaskCollection from "./useTaskCollection";
import { pickChakraRandomColor } from "@/utils/helpers";

const MAX_TASK_PER_COLUMN = 100;

function useColumnTasks(column: ColumnType) {
  const [tasks, setTasks] = useTaskCollection();

  const addEmptyTask = useCallback(() => {
    console.log(`Adding new empty task to ${column} column`);

    setTasks((allTasks) => {
      const columnTasks = allTasks[column];
      if (columnTasks.length > MAX_TASK_PER_COLUMN) {
        console.log("Too many task!");
        return allTasks;
      }
      const newColumnTasks: TaskModel = {
        id: uuidv4(),
        title: `New ${column} task`,
        color: pickChakraRandomColor(".300"),
        column,
      };

      return {
        ...allTasks,
        [column]: [newColumnTasks, ...columnTasks],
      };
    });
  }, [column, setTasks]);
  return {
    tasks: tasks[column],
    addEmptyTask,
  };
}

export default useColumnTasks;
