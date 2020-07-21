import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app';
import Remedy from './Remedy';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import RemedyList from './RemedyList';
import { message } from 'antd'

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

        setremedyList(data.liked);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

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


  useEffect(() => {
    setUser(auth.currentUser)
    getLikeList();
  }, [auth])

  return (
    <div>
      {user ? (remedyList ? remedyList.map(remedy => <Remedy event={unLike} setremedyList={getLikeList} canDelete={true} remedy={remedy} dragProp="list" />) : "nothing to show")
        : "please log in"}
    </div>
  )
}
