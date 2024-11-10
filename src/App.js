import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Navbar from './components/Navbar';
import AvailabilityForm from './components/AvailabilityForm';
import { AuthProvider } from './contextApi/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { UserProvider } from './contextApi/userContext';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Navbar />
          <div className="flex min-h-screen bg-gray-100">
            <Sidebar>
              <Routes>
                {/* Public Routes */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />

                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/setAvailability" element={<AvailabilityForm title={'Set Availability'} />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Routes>
            </Sidebar>
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
