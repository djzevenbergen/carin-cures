import React from 'react'
import { Redirect } from "react-router-dom";
import SignUp from './SignUp';

export default function RemedyList() {
  const [hidden, setLogin] = React.useState(false);

  return (
    <React.Fragment>
      {hidden ? <Redirect to="/signin" /> : <h3></h3>}

      <h1>Hi</h1>
      <button onClick={setLogin(true)}>Login page</button>
    </React.Fragment>

    // 

  )
}
