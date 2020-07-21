import React, { useState, useEffect } from 'react';
import ReactDom from "react-dom";
import { Redirect } from "react-router-dom";
import SignUp from './auth/SignUp';
import axios from "axios";
import Remedy from "./Remedy";

export default function RemedyList() {
  const [remedyList, setList] = useState(null);
  const [favePage, goToFaves] = useState(false);

  const likesPage = () => {
    goToFaves(!favePage);
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
        {remedyList ? remedyList.map(remedy => <Remedy remedy={remedy} />) : ''}
      </div>
      <button onClick={likesPage} > Likes </button>
      {favePage ? <Redirect to="/profile" /> : <h3></h3>}
    </React.Fragment >

  );
}


