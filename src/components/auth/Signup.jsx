import React from "react";
import { Button } from "@primer/react";

import "./auth.css";
import { Link } from "react-router-dom";
import logo from "../../assets/whitefox.png";

function Signup() {
  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <h2>Sign Up</h2>
        </div>
        <div className="login-box">
          <div>
            <label className="label">Username</label>
            <input
              autoComplete="off"
              name="Username"
              id="Username"
              className="input"
              type="text"
            />
          </div>

          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
            />
          </div>

          <div className="div">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
            />
          </div>
          <Button className="login-btn">Signup</Button>
        </div>

        <div className="pass-box">
          <p>
            Already have an account? <Link>Login</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
