import { CSSProperties, FC } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

const style: CSSProperties = {
  height: "20rem",
  width: "30rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
};

export const Board: FC = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: "Board" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = "#808080";
  if (isActive) {
    backgroundColor = "#DCDCDC";
  } else if (canDrop) {
    backgroundColor = "#03bb85";
  }

  return (
    <div ref={drop} role={"Board"} style={{ ...style, backgroundColor }}>
      {isActive ? "Release to drop" : "Drag a block here"}
    </div>
  );
};
