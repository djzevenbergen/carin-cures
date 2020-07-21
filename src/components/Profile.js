import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app';
import Remedy from './Remedy';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [remedyList, setremedyList] = useState([])
  const auth = firebase.auth();
  const firestore = useFirestore()

  const getLikeList = () => {


    let data;
    firestore.collection("users").where("userId", "==", auth.currentUser.uid).get()
      .then(function (querySnapshot) {


        querySnapshot.forEach(function (doc) {
          data = doc.data()
        });
        console.log(data)
        //
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

      {user ? remedyList.map(remedy => <Remedy remedy={remedy} />)
        : "please log in"}
    </div>
  )
}
