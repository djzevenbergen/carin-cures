import React from 'react'
import { useDrop } from 'react-dnd'




export default function Target(props) {
  const { plus } = props;
  //dnd start
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "remedy",
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  let style = {}



  const isActive = canDrop && isOver
  let backgroundColor;
  if (isActive) {
    backgroundColor = 'darkgreen'

  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
    style = {
      transform: "rotate(360deg)"
    }
  }
  //dnd end
  return (
    <div>
      <div className={plus ? "plus" : "minus"} ref={drop} style={{ ...style, backgroundColor }} >
      </div>
    </div>
  )
}
