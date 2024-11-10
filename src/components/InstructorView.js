import React from 'react'
import SlotCard from './SlotCard'

function InstructorView({userId,availableSlots,role,setUpdatedSlot,setDeleteSlot,setCancelSlot,bookedSlot,setConfirmedSlot}) {
  return (
    <div className='space-y-5'>
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Availability</h2>
            <div className="bg-slate-200 p-5 rounded-md">
              <div className="flex gap-5 overflow-scroll no-scrollbar">
                {availableSlots.length === 0?
                <div className='h-28 w-full flex justify-center items-center font-semibold text-xl'>
                slots are not yet!
                </div>
                :availableSlots.map((slot) => (
                  <div className='shrink-0' key={slot._id}>
                  <SlotCard setUpdatedSlot={setUpdatedSlot} setDeleteSlot={setDeleteSlot}  slot={slot} role={role} type={'availability'} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

<div className="space-y-10">
<div>
  <h2 className="text-2xl font-semibold mb-4">Upcoming Bookings</h2>
  <div className="bg-slate-200 p-5 rounded-md">
    <div className="flex gap-5 overflow-scroll no-scrollbar">
      {bookedSlot.filter((slot)=>!slot.isConfirm&&userId===slot.creatorId?._id).length === 0?
      <div className='h-28 w-full flex justify-center items-center font-semibold text-xl'>
             slots are not yet!
      </div>
      :bookedSlot.filter((slot)=>!slot.isConfirm&&userId===slot.creatorId?._id)
      .map((slot) => (
        <div className='shrink-0' key={slot._id}>
        <SlotCard setConfirmedSlot={setConfirmedSlot} setCancelSlot={setCancelSlot} setUpdatedSlot={setUpdatedSlot} slot={slot} role={role} type={'upcoming'} />
        </div>
      ))}
    </div>
  </div>
</div>
</div>

<div className="space-y-10">
<div>
  <h2 className="text-2xl font-semibold mb-4">Booked</h2>
  <div className="bg-slate-200 p-5 rounded-md">
    <div className="flex gap-5 overflow-scroll no-scrollbar">
      {bookedSlot.filter((slot)=>(slot.isConfirm&&userId===slot.creatorId?._id)).length === 0?
      <div className='h-28 w-full flex justify-center items-center font-semibold text-xl'>
             slots are not yet!
      </div>
      :bookedSlot.filter((slot)=>(userId===slot.creatorId?._id&&slot.isConfirm))
      .map((slot) => (
        <div className='shrink-0' key={slot._id}>
        <SlotCard setCancelSlot={setCancelSlot} setUpdatedSlot={setUpdatedSlot} slot={slot} role={role} type={'Booked'} />
        </div>
      ))}
    </div>
  </div>
</div>
</div>

</div>
  )
}

export default InstructorView