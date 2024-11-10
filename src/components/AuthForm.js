import React, { useState } from 'react';
import Modal from './Modal';
import { Link } from 'react-router-dom';

const AuthForm = ({ title, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(''); 
  const [isOpen, setIsOpen] = useState(true); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      await onSubmit({ name, email, password, role });
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit} className="space-y-4 md:w-2/5 w-[90%] m-auto bg-white p-5 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
        
        {title === 'Sign Up' && (
          <div className='space-y-1'>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black border-opacity-20 rounded-md outline-none"
              placeholder="Enter your name"
            />
          </div>
        )}
        
        <div className='space-y-1'>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black border-opacity-20 rounded-md outline-none"
            placeholder="Enter your email"
          />
        </div>
        
        <div className='space-y-1'>
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black border-opacity-20 rounded-md outline-none"
            placeholder="Enter your password"
          />
        </div>

        {title === 'Sign Up' && (
          <div className='space-y-1'>
            <label className="block text-gray-700 font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black border-opacity-20 rounded-md outline-none"
            >
              <option value="" disabled>Select role</option>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>
          </div>
        )}
        
        <button
          type="submit"
          className={`w-full bg-black font-semibold text-white py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center">
              <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            title
          )}
        </button>

        {title === 'Sign Up' ? (
          <p className="text-center">
            If you already have an account, <Link to='/signin' className='text-blue-500 font-semibold text-nowrap'>Sign In</Link>
          </p>
        ) : (
          <p className="text-center">
            If you don't already have an account, <Link to='/signup' className='text-blue-500 font-semibold text-nowrap'>Sign Up</Link>
          </p>
        )}

      </form>
    </Modal>
  );
};

export default AuthForm;
