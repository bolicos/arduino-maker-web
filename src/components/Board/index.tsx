import { blocks } from "#/src/models/blocks";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useDrop } from "react-dnd";
import Block from "../Block";


export const Board: React.FC = () => {
  const [board, setBoard] = useState([] as any[]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "blockImage",
    drop: (item: any) => addBlockToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }))

  const addBlockToBoard = (id) => {
    const boardList = blocks.filter((block) => id === block.id);
    setBoard((board) => [...board, boardList[0]]);
  }

  return (
    <Card className="text-center home-fluid">
      <Card.Header>Lousa</Card.Header>
      <Card.Body ref={drop}>
        {board.map((block) => {
          return <Block id={block.id} type={block.type} />
        })}
      </Card.Body>
      <Card.Footer className="text-muted"><br /></Card.Footer>
    </Card>
  )
};

export default Board;
