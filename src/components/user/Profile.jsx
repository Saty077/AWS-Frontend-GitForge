import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import defaultImg from "../../assets/default.avif";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeatMapProfile from "./Heatmap";
import { useAuth } from "../../AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "Username",
  });
  const { setCurrentUser } = useAuth();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    try {
      const fetchUserDetails = async () => {
        const res = await axios.get(
          `http://localhost:3000/getUserProfile/${userId}`
        );

        setUserDetails(res.data);
      };
      fetchUserDetails();
    } catch (error) {
      console.error("Erro fetching user details: ", error);
    }
  }, []);

  return (
    <div className="profileContainer">
      <Navbar />
      <UnderlineNav aria-label="Repository">
        <UnderlineNav.Item
          aria-current="page"
          icon={BookIcon}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          Overview
        </UnderlineNav.Item>

        <UnderlineNav.Item
          onClick={() => navigate("/repo")}
          icon={RepoIcon}
          sx={{
            backgroundColor: "transparent",
            color: "whitesmoke",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          Starred Repositories
        </UnderlineNav.Item>
      </UnderlineNav>

      <div className="logout">
        <button
          onClick={() => {
            localStorage.removeItem("userId"),
              localStorage.removeItem("token"),
              setCurrentUser(false);
            navigate("/auth");
          }}
        >
          Logout
        </button>
      </div>

      <div className="profilePageWrapper">
        <div className="user-profile-section">
          <img className="profile-image" src={defaultImg} alt="" />
          <div className="username">
            <h3>{userDetails.username}</h3>
          </div>
          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>20 Follower</p>
            <p>5 Following</p>
          </div>
        </div>
        <div className="heatmap">
          <HeatMapProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
