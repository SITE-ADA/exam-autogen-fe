// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a new context for user information
const UserContext = createContext();

// Create a custom hook to consume the user context
export const useUser = () => useContext(UserContext);

// Create a provider component to supply the user information
export const UserProvider = ({ children }) => {
  // State to store user information
  const [user, setUser] = useState(null);

  // Function to update user information
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
