// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="bg-gray-800 text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold">
          <Link to="/">Booking System</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
