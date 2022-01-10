import React from "react";
import clsx from "clsx";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/models/ItemTypes";

import style from "./style.module.scss";

export const Board: React.FC = () => {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: ItemTypes.BOX,
		drop: () => ({ name: "Board" }),
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));

	const isActive = canDrop && isOver;

	return (
		<div
			data-testid="board"
			className={clsx(
				[style.board, style.backgroundColor],
				isActive && style.backgroundColorIsActive,
				canDrop && style.backgroundColorCanDrop
			)}
			ref={drop}
			role={"none"}
		>
			{isActive ? "Release to drop" : "Drag a block here"}
		</div>
	);
};

export default Board;
