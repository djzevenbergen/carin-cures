import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [remedyList, setremedyList] = useState(null)
  const auth = firebase.auth();
  const firestore = useFirestore()

  const getLikeList = () => {
    console.log('1');

    let data;
    firestore.collection("users").where("userId", "==", user.uid).get()
      .then(function (querySnapshot) {
        console.log('2');

        querySnapshot.forEach(function (doc) {
          data = doc.data()
        });
        console.log("3", data)
        setremedyList(data.liked);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }


  useEffect(() => {
    setUser(auth.currentUser)

    getLikeList();

  }, [auth])

  return (
    <div>

      {user ? console.log("4", user)
        : "please log in"}
    </div>
  )
}
