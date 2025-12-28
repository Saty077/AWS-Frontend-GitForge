import React, { useState } from "react";
import { Button } from "@primer/react";
import axios from "axios";
import "./auth.css";
import { Link } from "react-router-dom";
import logo from "../../assets/whitefox.png";
import { useAuth } from "../../AuthContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/signup", {
        email,
        username,
        password,
      });

      localStorage.setItem("token", res.data.userId);
      localStorage.setItem("userId", res.data.token);

      setCurrentUser(res.data.userId);

      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <h2>Sign Up for GitForge</h2>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="submit-btn"
            disabled={loading}
            onClick={handleSignup}
            variant="primary"
          >
            {loading ? "Loading..." : "Signup"}
          </Button>
        </div>

        <div className="pass-box">
          <p>
            Already have an account ? <Link>Login</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
