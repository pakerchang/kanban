import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { ItemType } from "../utils/enums";
import { TaskModel, DragItem } from "../utils/models";

// handleDropHover 經由Task 的調用取得，但其來源是 helpers.ts 的 swap, 並整合在 useColumnTask.ts
// 實際脈絡經過：useColumnTask.ts > Column.tsx > Task.tsx > useTaskDragAndDrop.ts
// 對於這樣的傳遞雖然在檔案上的追蹤較為合理，但我對此表示存疑
// 因為實際調用點在 useTaskDragAndDrop，並回傳 ref element, 為了這一點，是否存在不需要經過 Column.tsx, Task.tsx，且比原來的作法更適當的方式？
export function useTaskDragAndDrop<T extends HTMLElement>({
  task,
  index,
  handleDropHover,
}: {
  task: TaskModel;
  index: number;
  handleDropHover: (i: number, j: number) => void;
}) {
  const ref = useRef<T>(null);

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    item: { from: task.column, id: task.id, index },
    type: ItemType.TASK,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [_, drop] = useDrop<DragItem, void, unknown>({
    accept: ItemType.TASK,
    hover: (item, monitor) => {
      if (!ref.current) return;
      if (item.from !== task.column) return;

      const draggedItemIndex = item.index;
      const hoveredItemIndex = index;

      if (draggedItemIndex === hoveredItemIndex) return;

      //  Check drag task is part of same column
      const isDraggedItemAboveHovered = draggedItemIndex < hoveredItemIndex;
      const isDraggedItemBelowHovered = !isDraggedItemAboveHovered;

      const { x: mouseX, y: mouseY } = monitor.getClientOffset() as XYCoord;

      const hoveredBoundingRect = ref.current.getBoundingClientRect();
      const hoveredMiddleHeight =
        (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2;

      const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;

      const isMouseYAboveHoveredMiddleHeight =
        mouseYRelativeToHovered < hoveredMiddleHeight;

      const isMouseYBelowHoveredMiddleHeight =
        mouseYRelativeToHovered > hoveredMiddleHeight;

      if (isDraggedItemAboveHovered && isMouseYAboveHoveredMiddleHeight) return;
      if (isDraggedItemBelowHovered && isMouseYBelowHoveredMiddleHeight) return;

      const newItem = { ...item, index: hoveredItemIndex };
      handleDropHover(draggedItemIndex, hoveredItemIndex);
      item = newItem;
    },
  });
  drag(drop(ref));

  return {
    ref,
    isDragging,
  };
}
