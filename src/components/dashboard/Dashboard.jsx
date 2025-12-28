import React, { useEffect, useState } from "react";

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
      fetchAllPublicRepos(allPublicRepos);
    } catch (error) {
      console.log("Somthing went wrong while fetching all: ", error.message);
      alert("Error fetching data!");
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
