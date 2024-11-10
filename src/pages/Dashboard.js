import React, { useState, useEffect } from 'react';
import StudentView from '../components/StudentView';
import { getAllSlots } from '../apis/api'; 
import { useUser } from '../contextApi/userContext';
import InstructorView from '../components/InstructorView';

const Dashboard = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlot, setBookedSlot] = useState([]);
  const [updatedSlot, setUpdatedSlot] = useState([]);
  const [bookingSlot, setBookingSlot] = useState([]);
  const [cancelSlot, setCancelSlot] = useState([]);
  const [confirmedSlot, setConfirmedSlot] = useState([]);

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [DeleteSlot, setDeleteSlot] = useState();
  const [error, setError] = useState(null);
  const {user} = useUser()

  const role = user?.role || JSON.parse(localStorage.getItem('user'))?.role;
  const userId = user?._id || JSON.parse(localStorage.getItem('user'))?.id;


  useEffect(() => {
    const fetchAvailableSlots = async () => {
      setLoading(true);
      try {
        const slots = await getAllSlots();  
        if (role === 'Student') {
          setAvailableSlots(slots); 
        } else if (role === 'Instructor') {
          const instructorSlots = slots.filter(slot => slot.creatorId._id === userId);
          setAvailableSlots(instructorSlots); 
        }

        setBookedSlot(slots.filter((slot) => slot.isBooked));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch available slots');
        setLoading(false);
      }
    };
  
    fetchAvailableSlots();
  }, [role, userId, DeleteSlot, updatedSlot,bookingSlot,cancelSlot,confirmedSlot]);
  

  const handleBooking = (slot) => {
    setBookings([...bookings, slot]);
    setSelectedBooking(slot);
  };

  if (loading) return (<div className='h-full w-full flex justify-center items-center'><div className='h-8 w-8 border-4 rounded-full border-black border-t-slate-50 animate-spin'></div></div>);
  if (error) return (<div className='md:h-full md:w-full flex flex-col text-xl justify-center items-center text-center'><p>slot is not available</p><p>if you are a Instructor please create slot</p><p>if you are a student  please wait for Instructor</p></div>);

  return (
    <div className="md:p-8 p-4 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {role === 'Instructor' && (
       <InstructorView userId={userId} setConfirmedSlot={setConfirmedSlot} availableSlots={availableSlots} role={role} setUpdatedSlot={setUpdatedSlot} setDeleteSlot={setDeleteSlot} setCancelSlot={setCancelSlot} bookedSlot={bookedSlot} />
      )}       

      
      {role === 'Student' && !selectedBooking && (
        <StudentView userId={userId} setCancelSlot={setCancelSlot} availableSlots={availableSlots} setBookingSlot={setBookingSlot} onBookSlot={handleBooking}  role={role} />
      )}

    </div>
  );
};

export default Dashboard;
