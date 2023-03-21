import { ColumnType } from "./enums";

/**
 * @interface TaskModel
 * @description Task data structure
 * @type {string} id - Task identify
 * @type {string} title - Todos title
 * @type {stirng} color - background color, came from random color picker in helpers
 */
export interface TaskModel {
  id: string;
  title: string;
  column: ColumnType;
  color: string;
}

export interface DragItem {
  index: number;
  id: TaskModel["id"];
  from: ColumnType;
}
