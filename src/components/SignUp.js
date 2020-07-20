import React, { useState } from "react";
import firebase from 'firebase/app';

import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useHistory, Link } from 'react-router-dom';
import { render } from "@testing-library/react";


function SignUp() {


  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
      console.log("successfully signed up!");
    }).catch(function (error) {
      console.log(error.message);
    });
  }
  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={doSignUp}>
        <input
          type='text'
          name='email'
          placeholder='email' />
        <input
          type='password'
          name='password'
          placeholder='Password' />
        <button type='submit'>Sign up</button>
      </form>
    </>

  )

}

export default SignUp;