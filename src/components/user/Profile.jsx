import React from "react";
import Navbar from "../navbar/navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import defaultImg from "../../assets/default.avif";
import "./profile.css";

const Profile = () => {
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

      <div className="profilePageWrapper">
        <div className="user-profile-section">
          <img className="profile-image" src={defaultImg} alt="" />

          <div className="username">
            <h3></h3>
          </div>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>20 Follower</p>
            <p>5 Following</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
