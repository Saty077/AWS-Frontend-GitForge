import React from "react";
import logo from "../../assets/whiteFox.png";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav>
      <div>
        <Link to="/">
          <div className="login-logo-container">
            <img className="logo-login" src={logo} alt="Logo" />
            <h3>GitForge</h3>
          </div>
        </Link>
      </div>

      <div className="secondOption">
        <Link to="/create">
          <p>+ New Repository</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
