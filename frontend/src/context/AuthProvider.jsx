import React, { createContext, useEffect, useState } from 'react';
import { baseUrl } from '../Services/Endpoint';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/auth/is-auth`, { withCredentials: true });

      if (data.success && data.user) {
        setUser(data.user);  // <-- backend must return this 'user'
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("error in fetchUser:", error);
      setUser(null);
    }
  };


  useEffect(() => {
    fetchUser()
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
