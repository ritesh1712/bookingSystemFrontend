import React, { useEffect, useState } from 'react';
import { useUser } from '../contextApi/userContext';
import { updateProfile } from '../apis/api'; 

const Profile = () => {
  const { user } = useUser(); 
  const [formData, setFormData] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? { ...JSON.parse(savedUser) } : { ...user };
  });
  
  const profileImage = 
    'https://png.pngtree.com/png-clipart/20220301/ourmid/pngtree-d-rendering-male-character-profile-with-green-mint-sweater-blue-eyes-png-image_4466258.png'
  

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      localStorage.setItem('user', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await updateProfile(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
      localStorage.setItem('user', JSON.stringify(formData));
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Profile</h1>

      <div className="flex items-center space-x-4 mb-8">
        <div className="relative w-24 h-24">
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-full object-cover w-full h-full border border-gray-300"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{formData.name}</h2>
          <p className="text-gray-500">{formData.role}</p>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-black border-opacity-20 rounded-md outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-black border-opacity-20 rounded-md outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-black border-opacity-20 rounded-md outline-none"
            >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>
          </div>
          <button
            type="submit"
            className={`bg-green-500 text-white px-4 py-2 font-semibold rounded hover:bg-green-600 w-full ${loading ? 'cursor-wait' : ''}`}
            disabled={loading} 
          >
            {loading ? (
              <svg
                className="w-5 h-5 animate-spin mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-75"
                />
              </svg>
            ) : (
              'Save Changes'
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="w-full bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600 mt-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="space-y-2">
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Role:</strong> {formData.role}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-black text-white px-4 py-2 rounded mt-4 w-full"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
