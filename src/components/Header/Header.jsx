import React from "react";

import "./Header.css";

import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <div className="header-container">
      <img
        alt="logo"
        src={logo}
        height="50"
        width="50"
      />

      <ul className="header__nav">
        <li><p>Send Money</p></li>
        <li><p>Business & API</p></li>
        <li><p>Tools</p></li>
        <li><p>Resources</p></li>
      </ul>

      <div className="header__other">
        <p>Sign in</p>
        <button>Get the App</button>
      </div>
    </div>
  )
}

export default Header;