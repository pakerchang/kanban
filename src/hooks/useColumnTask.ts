import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { ColumnType } from "../utils/enums";
import { TaskModel } from "../utils/models";
import useTaskCollection from "./useTaskCollection";
import { pickChakraRandomColor, swap } from "../utils/helpers";

const MAX_TASK_PER_COLUMN = 100;

interface ColumnTasksType {
  tasks: TaskModel[];
  addEmptyTask: () => void;
  updateTask: (
    id: TaskModel["id"],
    updatedTask: Omit<Partial<TaskModel>, "id">
  ) => void;
  deleteTask: (id: TaskModel["id"]) => void;
  dropTaskFrom: (from: ColumnType, id: TaskModel["id"]) => void;
  swapTasks: (i: number, j: number) => void;
}

/**
 * @function useColumnTasks
 * @param {object} column
 * @method addEmptyTask -- Add new task label
 * @method updateTask -- update task content
 * @method deleteTask -- delete task
 * @method dropTaskFrom -- moving task to another block, ex: completed
 * @method swapTasks -- swaping task
 * @return {object}
 */
function useColumnTasks(column: ColumnType): ColumnTasksType {
  const [tasks, setTasks] = useTaskCollection();

  const addEmptyTask = useCallback(() => {
    setTasks((allTasks) => {
      const columnTasks = allTasks[column];
      if (columnTasks.length > MAX_TASK_PER_COLUMN) {
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

  const updateTask = useCallback(
    (id: TaskModel["id"], updatedTask: Omit<Partial<TaskModel>, "id">) => {
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];

        return {
          ...allTasks,
          [column]: columnTasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        };
      });
    },
    [column, setTasks]
  );

  const deleteTask = useCallback(
    (id: TaskModel["id"]) => {
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: columnTasks.filter((task) => task.id !== id),
        };
      });
    },
    [column, setTasks]
  );

  const dropTaskFrom = useCallback(
    (from: ColumnType, id: TaskModel["id"]) => {
      setTasks((allTasks) => {
        const fromColumnTasks = allTasks[from];
        const toColumnTasks = allTasks[column];
        const movingTask = fromColumnTasks.find((task) => task.id === id);

        if (!movingTask) return allTasks;

        return {
          ...allTasks,
          [from]: fromColumnTasks.filter((task) => task.id !== id),
          [column]: [{ ...movingTask, column }, ...toColumnTasks],
        };
      });
    },
    [column, setTasks]
  );

  const swapTasks = useCallback(
    (i: number, j: number) => {
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: swap(columnTasks, i, j),
        };
      });
    },
    [column, setTasks]
  );

  return {
    tasks: tasks[column],
    addEmptyTask,
    updateTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
  };
}

export default useColumnTasks;
