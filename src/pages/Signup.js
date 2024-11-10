import React from 'react';
import AuthForm from '../components/AuthForm';
import { signup } from '../apis/api'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
const navigate = useNavigate() 

  const handleSignup = async (userData) => {
    console.log(userData)
    try {
      const response = await signup(userData);
  
      console.log('Signup successful:', response);
      alert('Signup successful')
      navigate("/signin");
     
    } catch (error) {
    
      console.error('Error during signup:', error);
      alert(error.message || 'An error occurred during signup');
    }
  };

  return <AuthForm title="Sign Up" onSubmit={handleSignup} />;
};

export default Signup;
