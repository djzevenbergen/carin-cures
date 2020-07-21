import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import { useDrag } from 'react-dnd'


export default function Remedy(props) {
  const { remedy } = props;
  const [user, setUser] = useState(null);
  const auth = firebase.auth();
  const firestore = useFirestore()
  console.log(remedy);
  //dnd start
  const [{ isDragging }, drag] = useDrag({
    item: { remedy, type: "remedy" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        alert(remedy.name)
        onLike(remedy);
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

  const likeToPost = () => {
    //posts are handled by C# api so we would need to change that
  }

  const onLike = (post) => {
    let neededId = ''
    let data;
    firestore.collection("users").where("userId", "==", user.uid).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          neededId = doc.id
          data = doc.data()
        });
        return firestore.update({ collection: 'users', doc: neededId }, { liked: [...data.liked, post] })
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  return (
    <div ref={drag} className="remedy-box">
      <h2>{remedy.name}</h2>
      <p>{remedy.details}</p>
      <h3>category: {remedy.category}</h3>
      {user != null ? <button onClick={() => onLike(remedy)}>Like</button> : ''}
    </div>
  )
}
