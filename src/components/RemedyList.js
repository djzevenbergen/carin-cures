import React, { useState, useEffect } from 'react';
import ReactDom from "react-dom";
import { Redirect } from "react-router-dom";
import SignUp from './auth/SignUp';
import axios from "axios";
import Remedy from "./Remedy";
import { useFirestore } from 'react-redux-firebase';
import firebase from 'firebase/app';
import { message } from "antd";

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

    < React.Fragment >
      <div className="remedy-container">
        {remedyList ? remedyList.map(remedy => <Remedy remedy={remedy} dragProp="list" canDelete={false} event={onLike} />) : ''}
      </div>
      <button onClick={likesPage} > Likes </button>
      {favePage ? <Redirect to="/profile" /> : <h3></h3>}
    </React.Fragment >

  );
}


