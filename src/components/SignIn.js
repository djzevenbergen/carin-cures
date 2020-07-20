import React, { useState } from "react";
import firebase from 'firebase/app';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useHistory, Link } from 'react-router-dom';
import { render } from "@testing-library/react";
import SignUp from './SignUp';

function SignIn() {

  // const [hidden, setHidden] = useState(false);

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signInEmail.value;
    const password = event.target.signInPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {

      // console.log("Successfully signed in!");
      // console.log(hidden);
      // setHidden(!hidden);
      // console.log(hidden);


    }).catch(function (error) {
      console.log(error.message);
    });
  }

  function doSignOut() {
    firebase.auth().signOut().then(function () {
      console.log("Successfully signed out!");
    }).catch(function (error) {
      console.log(error.message);
    });
  }

  return (
    <React.Fragment>

      {/* {hidden ? <SignUp /> : <h3></h3>} */}

      <h1>Sign In</h1>
      <form onSubmit={doSignIn}>
        <input
          type='text'
          name='signInEmail'
          placeholder='Email' />
        <input
          type='password'
          name='signInPassword'
          placeholder='Password' />
        <button type='submit'>Sign In</button>
      </form>
      {/* <button onClick={setHidden(true)}>Sign Up</button> */}

      <h1>Sign Out</h1>
      <button onClick={doSignOut}>Sign Out</button>
    </React.Fragment>
  );

}

export default SignIn;