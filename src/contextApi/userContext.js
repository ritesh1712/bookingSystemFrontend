// UserContext.js
import React, { createContext, useContext, useState,useEffect } from 'react';
import { getUser } from '../apis/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("user")) {
       
      } 
      else if(localStorage.getItem("token")){
        const savedUser = localStorage.getItem('user');
        setUser(JSON.parse(savedUser)) 
     const token = localStorage.getItem("token");
     try {
       const response = await getUser({ token });
       console.log('getUser successFully:', response);
      localStorage.setItem("user", JSON.stringify(response));
       setUser(response);
     } catch (error) {
       console.error('Error during fetching user:', error);
       // alert(error.message || 'An error occurred during fetching user');
     }
      }
      else {
        console.log('user not signed in');
      }
    };
  
    fetchUser(); // Call the async function
  }, []);
  




  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
