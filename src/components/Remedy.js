import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import { useDrag } from 'react-dnd';
import { message } from 'antd';
import * as t from "tone";



export default function Remedy(props) {
  const { remedy, dragProp, canDelete, setremedyList, event } = props;
  const [user, setUser] = useState(null);

  const auth = firebase.auth();
  const firestore = useFirestore()
  //dnd start
  const [{ isDragging }, drag] = useDrag({
    item: { remedy, type: "remedy", },
    end: async (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult && dragProp === "list") {
        await event(remedy);
        setremedyList()
        // create a new synth and route the output to master
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
    console.log(auth.currentUser)
    setUser(auth.currentUser)
  }, [auth])

  const unLike = (post) => {
    let neededId = ''
    let data = { liked: [] };
    let haslikedPost = false;
    firestore.collection("users").where("userId", "==", user.uid).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          neededId = doc.id
          data = doc.data()
        });
        let temp = [];
        data.liked.forEach(likedPost => {
          if (likedPost.remedyId != post.remedyId) {
            temp.push(likedPost)
          }
          console.log("temp=>", temp);


          return firestore.update({ collection: 'users', doc: neededId }, { liked: temp })

        })

      })
      .catch(function (error) {

        console.log("Error getting documents: ", error);
      });

  }






  return (
    <>

      {
        user ?
          <div ref={drag} className="remedy-box">
            < h2 > {remedy.name}</h2 >
            <p>{remedy.details}</p>
            <h3>category: {remedy.category}</h3>
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
