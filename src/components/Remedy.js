import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';

export default function Remedy(props) {
  const { remedy } = props;
  const [user, setUser] = useState(null);
  const auth = firebase.auth();
  const firestore = useFirestore()

  useEffect(() => {
    console.log(auth.currentUser)
    setUser(auth.currentUser)
  }, [auth])

  const onLike = (postId) => {
    let neededId = ''
    let data;
    firestore.collection("users").where("userId", "==", user.uid).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          neededId = doc.id
          data = doc.data()
        });
        return firestore.update({ collection: 'users', doc: neededId }, { liked: [...data.liked, postId] })
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  return (
    <div>
      <h2>{remedy.name}</h2>
      {user != null ? <button onClick={() => onLike(remedy.remedyId)}>Like</button> : ''}
    </div>
  )
}
