import React from 'react'
import { useDrop } from 'react-dnd'
export default function Target() {
  //dnd start
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "remedy",
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = canDrop && isOver
  let backgroundColor = '#222'

  //dnd end
  return (
    <div>
      <div className="target" ref={drop} >
        {isActive ? 'Release to drop' : 'Drag a box here'}
      </div>
    </div>
  )
}
