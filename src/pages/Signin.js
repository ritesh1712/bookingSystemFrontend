import React from 'react';
import AuthForm from '../components/AuthForm';
import { signin } from '../apis/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextApi/AuthContext';

const Signin = () => {
  const navigate = useNavigate() 
  const {login} = useAuth()

  const handleSignin = async (userData) => {
    try {
      const response = await signin({email:userData.email,password:userData.password}); 
      console.log('Signin successful:', response);
      login();
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      alert('Signin successful');
      navigate("/");
     
    
    } catch (error) {
      console.error('Error during signin:', error);
      alert(error.message || 'An error occurred during signin');
    }
  };
  
  return <AuthForm title="Sign In" onSubmit={handleSignin} />;
};

export default Signin;
