import React from 'react'
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <>
      <div className="header">
        <Link to="/signin">Sign in</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/">Home</Link>

      </div>
    </>
  )
}
