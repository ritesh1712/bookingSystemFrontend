import axios from 'axios';

// Use the API URL from the environment variable
const API_URL = process.env.REACT_APP_API_URL; 


// Set up Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Calls

// User Authentication (Signup and Signin)
export const signup = async (userData) => {
  try {
    const response = await api.post('/user/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const signin = async (userData) => {
  try {
    const response = await api.post('/user/auth/signin', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Update User Profile (Sending token in headers)
export const updateProfile = async (userData) => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await api.put('/user/updateProfile', userData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Create a Slot (Sending token in headers)
export const createSlot = async (slotData) => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await api.post('/slot/create', slotData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Edit a Slot (Sending token in headers)
export const editSlot = async (slotId, slotData) => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await api.put(`/slot/edit/${slotId}`, slotData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Delete a Slot (Sending token in headers)
export const deleteSlot = async (slotId) => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await api.delete(`/slot/delete/${slotId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Book a Slot (Sending token in headers)
export const bookSlot = async (slotId) => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await api.put(
      `/slot/book/${slotId}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Confirm Slot (Setting isConfirm to true)
export const confirmSlot = async (slotId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.put(
      `/slot/confirm/${slotId}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};



// Cancel a Slot (Sending token in headers)
export const cancelSlot = async (slotId) => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await api.put(
      `/slot/cancel/${slotId}`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get All Slots (Sending token in headers)
export const getAllSlots = async () => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await api.get('/slot/getAllSlots', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get User (Sending token in headers)
export const getUser = async () => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await api.get('/user/getSlots', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default api;
