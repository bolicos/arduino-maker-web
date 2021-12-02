import React from 'react'
import clsx from 'clsx';
import { useDrag } from 'react-dnd'
import { ItemTypes } from '@/models/ItemTypes'
import { BlockTypes } from '@/models/blocks'

import style from "./style.module.scss"
import { monitorEventLoopDelay } from 'perf_hooks';

export interface Props {
  id: number,
  type: BlockTypes
}

export const Block: React.FC<Props> = ({id, type}) => {

  const [{isDragging}, drag] = useDrag(() => ({
    type: "blockImage",
    item: {id: id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }))

    return (
      <h6 ref={drag} style={{border: isDragging ? "5px solid pink" : "0px"}}> I'm a block id {id} and type {type} </h6>
    )
  }
  
  export default Block;
