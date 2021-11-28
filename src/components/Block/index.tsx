import React from 'react'
import clsx from 'clsx';
import { useDrag } from 'react-dnd'
import { ItemTypes } from '@/models/ItemTypes'
import { BlockTypes } from '@/models/blocks'

import style from "./style.module.scss"

export interface Props extends React.HTMLAttributes<HTMLButtonElement>{
  block: BlockTypes
}

interface DropResult {
  name: string
}

export const Block: React.FC<Props> = ({ block }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { block },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        alert(`You dropped ${item} into ${dropResult.name}!`)
        // FIXAR O BLOCO E MOSTRAR A STRING
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  return (
    <div
      className={
        clsx(
          [style.block],
          isDragging ? style.opacityIsDraggin : style.opacity,
        )
      }

      ref={drag}
      role="none"
      data-testid={`box-${block}`}
    >
      {block}
    </div>
  )
}

export default Block;
