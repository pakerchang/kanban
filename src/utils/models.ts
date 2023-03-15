import { ColumnType } from "@/utils/enums";

export interface TaskModel {
  id: string;
  title: string;
  column: ColumnType;
  color: string;
}
