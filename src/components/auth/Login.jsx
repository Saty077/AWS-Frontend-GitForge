import React, { useEffect, useState } from "react";
import { Button } from "@primer/react";
import axios from "axios";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/whiteFox.png";
import { useAuth } from "../../AuthContext";

function Login() {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(false);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("token", res.data.token);

      setCurrentUser(res.data.userId);

      setLoading(false);

      navigate("/");
    } catch (error) {
      console.log(error.message);
      alert("Login failed!");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <h2>Login to GitForge</h2>
        </div>
        <div className="login-box">
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
            onClick={handleLogin}
            variant="primary"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>

        <div className="pass-box">
          <p>
            Already have an account ? <Link to={"/signup"}>Signup</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
