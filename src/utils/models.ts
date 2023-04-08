import { ColumnType } from "./enums";

/**
 * @interface TaskData
 * @description define the Tasks content type
 * @param {string} title
 * @type {string} description
 */
export interface TaskData {
  title: string;
  description: string;
}

/**
 * @interface TaskModel
 * @description Task data structure
 * @param {string} id - Task identify
 * @param {string} title - Todos title
 * @param {stirng} color - background color, came from random color picker in helpers
 */
export interface TaskModel {
  id: string;
  // data: TaskContent;
  title: string;
  column: ColumnType;
  color: string;
}

/**
 * @interface DragItem
 * @description define DragItem props content
 * @param {number} index
 * @param {TaskModel} id: access TaskModel.id
 * @param {ColumnType} from: define drag item came from which section, content structure define from ColumnType
 */
export interface DragItem {
  index: number;
  id: TaskModel["id"];
  from: ColumnType;
}
