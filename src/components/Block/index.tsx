import React, { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { useDrag } from "react-dnd";
import { StateMaker } from "#/pages/Maker";
import { ItemTypes } from "#/models/ItemTypes";
import { BlockTypesEnum } from "#/models/blocks";

import style from "./style.module.scss";

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  block: BlockTypesEnum;
  setState: Dispatch<SetStateAction<StateMaker>>;
}

interface DropResult {
  name: string;
}

export const Block: React.FC<Props> = ({ block, setState }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { block },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        setState(prev => ({
          ...prev,
          code: block,
        }));
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
		<div
			className={clsx([style.block], isDragging ? style.opacityIsDraggin : style.opacity)}
			ref={drag}
			role="none"
			data-testid={`block-${block}`}
		>
			{block}
		</div>
  );
};

export default Block;
