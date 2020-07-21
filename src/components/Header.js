import React from 'react'
import { Link } from "react-router-dom"
import Target from './Target';
export default function Header() {
  return (
    <>
      <div>
        <Link to="/signin">Sign in</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/">Home</Link>
        <Target />
      </div>
    </>
  )
}
