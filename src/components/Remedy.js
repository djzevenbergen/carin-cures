import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useDrag } from 'react-dnd';
import * as t from "tone";



export default function Remedy(props) {
  const { remedy, dragProp, event } = props;
  const [user, setUser] = useState(null);

  const auth = firebase.auth();
  //dnd start
  // eslint-disable-next-line
  const [{ isDragging }, drag] = useDrag({
    item: { remedy, type: "remedy", },
    end: async (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult && dragProp === "list") {
        await event(remedy);
        const synth = new t.MembraneSynth().toMaster();
        // play a note with the synth we setup
        synth.triggerAttackRelease("C2", "8n");
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  //dnd end
  useEffect(() => {
    setUser(auth.currentUser)
  }, [auth])


  return (
    <>

      {
        user ?
          <div ref={drag} className="remedy-box">
            < h2 > {remedy.name}</h2 >

            <p><strong>Ingedients:</strong> {remedy.ingredients}</p>
            <p><strong>Instructions: </strong>{remedy.details}</p>
            <h3>Category: {remedy.category}</h3>
          </div >
          :
          <div className="remedy-box">
            <h2>{remedy.name}</h2>
            <p>{remedy.details}</p>
            <h3>category: {remedy.category}</h3>
          </div>
      }
    </>
  )
}
