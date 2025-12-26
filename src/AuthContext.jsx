import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setCurrentUser(userId);
    }
  }, []);

  const providerValues = { currentUser, setCurrentUser };

  <AuthContext.Provider value={providerValues}>
    {children}
  </AuthContext.Provider>;
};
