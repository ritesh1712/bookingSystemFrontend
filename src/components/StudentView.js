import React from 'react';
import SlotCard from './SlotCard';

const StudentVew = ({ userId,availableSlots,setBookingSlot,setCancelSlot, role }) => {

  
  return (

    <div className="space-y-5">
    <div className="space-y-5">
      <h2 className="text-2xl font-bold mb-4">Available Slots</h2>
      <div className="bg-slate-200 p-5 rounded-md">
        <div className="flex gap-5 overflow-scroll no-scrollbar">
        {availableSlots.filter((slot)=>slot.studentId?._id!==userId&&!slot.isConfirm&&!slot.isBooked).length === 0?
                <div className='h-28 w-full flex justify-center items-center font-semibold text-xl'>
                slots are not yet!
                </div>
                :availableSlots.filter((slot)=>slot.studentId?._id!==userId&&!slot.isConfirm&&!slot.isBooked).map((slot) => (
                  <div className='shrink-0' key={slot._id}>
                  <SlotCard setBookingSlot={setBookingSlot} type={'bookList'} slot={slot} role={role} />
                  </div>
                ))}
        </div>
      </div>
        </div>

        <div className="space-y-5">
      <h2 className="text-2xl font-bold mb-4">Pending</h2>
      <div className="bg-slate-200 p-5 rounded-md">
        <div className="flex gap-5 overflow-scroll no-scrollbar">
        {availableSlots.filter((slot)=>slot.studentId?._id===userId&&!slot.isConfirm).length === 0?
                <div className='h-28 w-full flex justify-center items-center font-semibold text-xl'>
                slots are not yet!
                </div>
                :availableSlots.filter((slot)=>(slot.studentId?._id===userId&&!slot.isConfirm)).map((slot) => (
                  <div className='shrink-0' key={slot._id}>
                  <SlotCard setCancelSlot={setCancelSlot} setBookingSlot={setBookingSlot} type={'pending'} slot={slot} role={role} />
                  </div>
                ))}
        </div>
      </div>
        </div>

        <div className="space-y-5">
      <h2 className="text-2xl font-bold mb-4">booked</h2>
      <div className="bg-slate-200 p-5 rounded-md">
        <div className="flex gap-5 overflow-scroll no-scrollbar">
        {availableSlots.filter((slot)=>slot.studentId?._id===userId&&slot.isConfirm).length === 0?
                <div className='h-28 w-full flex justify-center items-center font-semibold text-xl'>
                slots are not yet!
                </div>
                :availableSlots.filter((slot)=>slot.studentId?._id===userId&&slot.isConfirm).map((slot) => (
                  <div className='shrink-0' key={slot._id}>
                  <SlotCard setCancelSlot={setCancelSlot} setBookingSlot={setBookingSlot} type={'upcoming'} slot={slot} role={role} />
                  </div>
                ))}
        </div>
      </div>
        </div>

    </div>
  );
};

export default StudentVew;
