import React, { useState, useEffect } from 'react';
import { createSlot, editSlot } from '../apis/api';

const AvailabilityForm = ({ availability,setIsOpen, setUpdatedSlot, title }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (availability) {
      setDate(availability.date ? new Date(availability.date).toISOString().split('T')[0] : '');
      setTime(availability.time || '');
      setDuration(availability.duration || '');
    }
  }, [availability]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  

    try {
      const slotData = { date, time, duration };
      if (availability) {
      const update = await editSlot(availability._id, slotData);
        setUpdatedSlot(update)
        setIsOpen(false)
        alert("Availability updated successfully!");
      } else {
        await createSlot(slotData);
        alert("Availability created successfully!");
      }

      // Clear input fields after submission
      setDate('');
      setTime('');
      setDuration('');
      
    } catch (error) {
      console.error("Error submitting availability:", error);
      alert("Failed to submit availability. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-5">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <div className={`space-y-4 max-w-md p-5 m-auto ${!availability && 'bg-slate-200 shadow-md'}`}>
        <div>
          <label className="block text-gray-700">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700">Select Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 border rounded-md outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700">Duration (in hours)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-2 border rounded-md outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md"
          disabled={loading}
        >
          {loading ? 'Submitting...' : availability ? 'Update Availability' : 'Set Availability'}
        </button>
      </div>
    </form>
  );
};

export default AvailabilityForm;
