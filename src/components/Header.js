import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import firebase from 'firebase/app';

export default function Header() {
  const auth = firebase.auth();
  const [user, setUser] = useState(null);

  //dnd end
  useEffect(() => {
    console.log(auth.currentUser)
    setUser(auth.currentUser)
  }, [auth])

  return (
    <>
      <div className="header">
        <p id="username"></p>
        <Link to="/signin">Sign in</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/">Home</Link>

      </div>
    </>
  )
}
