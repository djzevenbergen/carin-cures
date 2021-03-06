import React, { useState, useEffect } from 'react';
import axios from "axios";
import Remedy from "./Remedy";
import { useFirestore } from 'react-redux-firebase';
import firebase from 'firebase/app';
import { message } from "antd";
import Plus from "./Plus"

export default function RemedyList() {
  const [remedyList, setList] = useState(null);
  const [favePage, goToFaves] = useState(false);
  const [user, setUser] = useState(null);
  const auth = firebase.auth();
  const firestore = useFirestore();

  const likesPage = () => {
    goToFaves(!favePage);
  }

  useEffect(() => {
    console.log(auth.currentUser)
    setUser(auth.currentUser)
  }, [auth])

  const onLike = (post) => {
    let neededId = ''
    let data = { liked: [] };
    let haslikedPost = false;
    firestore.collection("users").where("userId", "==", user.uid).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          neededId = doc.id
          data = doc.data()
        });
        if (data.liked !== undefined) {
          data.liked.forEach(likedPost => {
            if (likedPost.remedyId === post.remedyId) {
              haslikedPost = true;
            }
          })
          if (haslikedPost) {
            message.warn("Already liked this my dude!")
          } else {
            message.success("Post added to profile!")
            return firestore.update({ collection: 'users', doc: neededId }, { liked: [...data.liked, post] })

          }
        } else {
          return firestore.update({ collection: 'users', doc: neededId }, { liked: [post] })
        }
      })
      .catch(function (error) {

        console.log("Error getting documents: ", error);
      });
  }

  const apiCall = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/remedies`, {
        headers: new Headers({
          'Authorization': 'Bearer' + process.env.REACT_APP_API_KEY,
          'Content-Type': 'application/json'
        })
      });
      setList(response.data.remedies);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    apiCall()
  }, [])

  return (

    <div className="main-container">
      <div className="remedy-container">
        <div className="remedy-box">
          <Plus plus={true} />
          <p>Drag and drop remedies to add to your list</p>
        </div>
        {remedyList ? remedyList.map((remedy, i) => <Remedy key={i} remedy={remedy} dragProp="list" canDelete={false} event={onLike} setremedyList={setList} />) : ''}
      </div>
      <button onClick={likesPage} > Likes </button>

    </div >

  );
}


