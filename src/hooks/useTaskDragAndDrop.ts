import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { ItemType } from "../utils/enums";
import { TaskModel, DragItem } from "../utils/models";

export function useTaskDragAndDrop<T extends HTMLElement>(
  {
    task,
    index,
  }: {
    task: TaskModel;
    index: number;
  },
  handleDropHover: (i: number, j: number) => void
) {
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
      const hoverdItemIndex = index;

      if (draggedItemIndex === hoverdItemIndex) return;

      const isDraggedItemAboveHovered = draggedItemIndex < hoverdItemIndex;
      const isDraggedItemBelowHovered = !isDraggedItemAboveHovered;

      // get mouse coordinatees
      const { x: mouseX, y: mouseY } = monitor.getClientOffset() as XYCoord;

      const hoveredBoundingRect = ref.current.getBoundingClientRect();
      // get hover item rectangle
      const hoveredMiddleHeight =
        (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2;

      const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;
      const isMouseYAboveHoveredMiddleHeight =
        mouseYRelativeToHovered < hoveredMiddleHeight;
      const isMouseYBelowHoveredMiddleHeight =
        mouseYRelativeToHovered > hoveredMiddleHeight;

      if (isDraggedItemAboveHovered && isMouseYAboveHoveredMiddleHeight) return;
      if (isDraggedItemBelowHovered && isMouseYBelowHoveredMiddleHeight) return;

      // Time to actually perform the action
      handleDropHover(draggedItemIndex, hoverdItemIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverdItemIndex;
    },
  });

  drag(drop(ref));

  return {
    ref,
    isDragging,
  };
}
