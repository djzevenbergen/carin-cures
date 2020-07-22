import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app';
import Remedy from './Remedy';
import Plus from './Plus';
import { useFirestore } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'
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
    firestore.collection("users").where("userId", "==", user.uid).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          neededId = doc.id
          data = doc.data()
        });
        let temp = [];
        data.liked.forEach(likedPost => {
          if (likedPost.remedyId !== post.remedyId) {
            setremedyList([...temp, likedPost])
            temp.push(likedPost)
          }
          console.log("temp=>", temp);
          if (temp <= 1) {
            setremedyList([])
          }
        })
        message.success("Removed from list!")
        return firestore.update({ collection: 'users', doc: neededId }, { liked: temp })
      })
      .catch(function (error) {

        console.log("Error getting documents: ", error);
      });
  }

  useEffect(() => {
    setUser(auth.currentUser)
    if (auth.currentUser) {
      getLikeList();
    }
    // eslint-disable-next-line
  }, [auth])

  return (
    <div className="main-container">
      {auth.currentUser ? "" : <Redirect to="/signin" />}
      <div className="remedy-container">
        <div className="remedy-box">
          <Plus plus={false} />
          <p>Drag and drop remedies to remove from your list</p>
        </div>
        {user ? (remedyList ? remedyList.map((remedy, i) => <Remedy key={i} event={unLike} setremedyList={setremedyList} canDelete={true} remedy={remedy} dragProp="list" />) : "nothing to show")
          : "please log in"}
      </div>
    </div>
  )
}
