import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Navbar from "../navbar/navbar";

const Dashboard = () => {
  const [allPublicRepos, setAllPublicRepos] = useState([]);
  const [userRepos, setUserRepos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    try {
      const fetchUserRepo = async () => {
        const res = await fetch(`http://localhost:3000/repo/user/${userId}`);
        const data = await res.json();
        // console.log(data.repositories);
        setUserRepos(data.repositories);
      };
      fetchUserRepo();
    } catch (error) {
      console.log("Somthing went wrong while fetching users: ", error.message);
      alert("Error fetching data!");
    }
  }, []);

  useEffect(() => {
    try {
      const fetchAllPublicRepos = async () => {
        const res = await fetch(`http://localhost:3000/repo/all`);
        const data = await res.json();
        console.log(data);
        setAllPublicRepos(data);
        console.log(data);
      };
      fetchAllPublicRepos();
    } catch (error) {
      console.log("Somthing went wrong while fetching all: ", error.message);
      alert("Error fetching data!");
    }
  }, []);

  useEffect(() => {
    try {
      if (searchQuery == "") {
        setSearchResults(userRepos);
      } else {
        const filterRepos = userRepos.filter((repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filterRepos);
      }
    } catch (error) {
      console.error("something went wrong during search!");
      alert("Error Searching Repos!");
    }
  }, [searchQuery, userRepos]);

  return (
    <>
      <Navbar />
      <section className="dashboardContainer">
        <aside>
          <h3>All Repositories</h3>
          {allPublicRepos.map((repo) => {
            return (
              <div key={repo._id}>
                <li>{repo.name}</li>
                <li>{repo.description}</li>
              </div>
            );
          })}
        </aside>
        <main>
          <h2>Your Repositories</h2>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchResults.map((repo) => {
            return (
              <div key={repo._id}>
                <li>{repo.name}</li>
                <li>{repo.description}</li>
              </div>
            );
          })}
        </main>
        <aside>
          <h3>Satyam's Other Projects</h3>
          <ul>
            <li>wonderLust: Booking Website</li>
            <li>Meetrix: VideoConfrencing Website</li>
            <li>TradeFlow: Stock Monitoring Website</li>
            <li>Issac: Chat Bot</li>
            <li>ProCircle: Pro Social Media</li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
