import useNavigate from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";

const ProjectRoutes = () => {
  const { currUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    if (!currUser && userIdFromStorage) {
      setCurrentUser(userIdFromStorage);
    }

    if (
      !userIdFromStorage &&
      !["/auth", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/auth");
    }

    if (userIdFromStorage && window.location.pathname == "/auth") {
      navigate("/");
    }
  }, [currUser, navigate, setCurrentUser]);

  const elements = [
    {
      element: <Login />,
      path: "/auth",
    },
    {
      element: <Signup />,
      path: "/signup",
    },
    {
      element: <Dashboard />,
      path: "/",
    },
    {
      element: <Profile />,
      path: "/profile",
    },
  ];

  return elements;
};

export default ProjectRoutes;
