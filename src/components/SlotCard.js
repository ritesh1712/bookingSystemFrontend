import React, { useState } from "react";
import Modal from "./Modal";
import AvailabilityForm from "./AvailabilityForm";
import { deleteSlot, bookSlot, cancelSlot,confirmSlot } from "../apis/api";

function SlotCard({
  setDeleteSlot,
  setUpdatedSlot,
  setCancelSlot,
  setBookingSlot,
  setConfirmedSlot,
  slot,
  role,
  type,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonType, setButtonType] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading,setLoading]= useState(false)

  const formattedDate = new Date(slot.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleModal = (type) => {
    setButtonType(type);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await deleteSlot(slot._id);
      setDeleteSlot(response.deleted._id);
      alert("Slot deleted successfully");
      setLoading(false)
    } catch (err) {
      console.error("Error deleting slot:", err);
      alert("Failed to delete slot");
      setLoading(false)
    } finally {
      setIsOpen(false);
    }
  };

  const handleCancelSlot = async (slotId) => {
    setLoading(true)
    try {
      const response = await cancelSlot(slotId);
      setCancelSlot(response);
      alert("Slot canceled successfully!");
      setLoading(false)
    } catch (error) {
      
      alert("Failed to cancel slot. Please try again.");
      console.error("Error canceling slot:", error);
      setLoading(false)

    }
  };

  const handleBooking = async () => {
    setLoading(true)
    try {
      const result = await bookSlot(slot._id);
      console.log("Booking successful:", result);
      setBookingSlot(result);
      alert("Booking successful:");
      setLoading(false)
    } catch (error) {
      console.error("Booking failed:", error);
      setLoading(false)
    }
  };

  const handleConfirm = async (slotId)=>{
    setLoading(true)
    try {
      const response = await confirmSlot(slotId);
      setConfirmedSlot(response);
      alert("Slot confirm successfully!");
      setLoading(false)
    } catch (error) {
      alert("Failed to confirm slot. Please try again.");
      console.error("Error confirm slot:", error);
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded-md bg-slate-50 shadow-md shrink-0">
      <div>
        <h1 className="font-semibold text-lg flex gap-2">

        {
          (role === 'Instructor' && type === 'availability') &&
          ( <>
           <p>Instructor</p>
           <p>{slot.creatorId?.name}</p> 
           </>)
           
          }
          {
            role === 'Student' && type === 'bookList' &&( <>
            <p>Instructor</p>
            <p>{slot.creatorId?.name}</p> 
            </>)
          } 
          {
            role === 'Student' && type !== 'bookList' &&( <>
            <p>Student</p>
            <p>{slot.studentId?.name}</p> 
            </>)
          } 
        
     {

       (role === 'Instructor' && type !== 'availability') &&
          (
            <>
           <p>Student</p>
          <p>{slot.studentId?.name}</p> 
            </>
         )
        }
        



          {/* {role === "Instructor" ? "ritesh" : slot.creatorId.name} */}
        </h1>
      </div>
      <p>Date: {formattedDate}</p>
      <p>Time: {slot.time}</p>
      <p>Duration: {slot.duration} hours</p>

      {/* Cancel button for students */}
      {role === "Student" && type === "pending" && (
        <button
          className="bg-red-500 w-full flex justify-center gap-3 font-medium rounded hover:bg-red-600 mt-2"
          title="delete"
          onClick={() => handleCancelSlot(slot._id)}
        >
          Cancel <i className="material-icons">delete</i>
        </button>
      )}

      {role !== "Student" && type === "upcoming" && (
        <div className="mt-2 flex flex-col gap-y-2">
          <button
            className="bg-green-500 w-full flex justify-center gap-3 font-medium rounded hover:bg-green-600"
            title="edit"
            onClick={() => handleConfirm(slot._id)}
          >
           {
            loading?<div className='h-4 w-4 m-2 border-2 rounded-full border-black animate-spin'></div>
:<span> Confirm <i className="material-icons">edit</i></span>
           }

           
          </button>
          <button
            className="bg-red-500 w-full flex justify-center gap-3 font-medium rounded hover:bg-red-600 mt-2"
            title="delete"
            onClick={() => handleCancelSlot(slot._id)}
          >
{
loading?<div className='h-4 w-4 m-2 border-2 rounded-full border-black animate-spin'></div>
:<span> Cancel <i className="material-icons">delete</i></span>
}
           
          </button>
        </div>
      )}

      {/* Add to Book List button */}
      {type === "bookList" && role === "Student" && (
        <button
          onClick={handleBooking}
          className="bg-green-500 w-full flex justify-center gap-3 font-medium rounded hover:bg-green-600 mt-2 px-2"
        >
  {
            loading?<div className='h-4 w-4 m-2 border-2 rounded-full border-black animate-spin'></div>
:<span> Book Slot</span>
           }

         
        </button>
      )}

      {/* Edit and Delete buttons for instructors */}
      {role !== "Student" && type !== "upcoming" && type !== 'Booked' && (
        <div className="mt-2 flex flex-col gap-y-2">
          <button
            className="bg-green-500 w-full flex justify-center gap-3 font-medium rounded hover:bg-green-600"
            title="edit"
            onClick={() => handleModal("edit")}
          >
            Edit <i className="material-icons">edit</i>
          </button>
          <button
            onClick={() => handleModal("delete")}
            className="bg-red-500 w-full flex justify-center gap-3 font-medium rounded hover:bg-red-600"
            title="delete"
          >
            Delete <i className="material-icons">delete</i>
          </button>
        </div>
      )}

      {/* Modal for Delete Confirmation */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {buttonType === "delete" && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="md:w-2/5 w-4/5 space-y-5 bg-white m-auto p-5 rounded-lg"
          >
            <h2 className="font-semibold">
              Write <span className="text-red-500">"CONFIRM"</span> to delete a
              slot
            </h2>
            <input
              type="text"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black border-opacity-20 rounded-md outline-none"
              placeholder="CONFIRM"
            />
            {confirm === "CONFIRM" ? (
              <button
                onClick={() => handleDelete()}
                className="bg-red-500 float-right px-8 font-semibold py-2 flex items-center gap-1 rounded"
              >
                {
                  loading ? <div className='h-4 w-4 m-2 border-2 rounded-full border-black animate-spin'></div>:
                ( <span> Delete <i className="material-icons">delete</i> </span>)
                }
              </button>
            ) : (
              <button className="bg-red-500 opacity-70 cursor-not-allowed float-right px-8 font-semibold py-2 flex items-center gap-1 rounded">
                Delete <i className="material-icons">delete</i>
              </button>
            )}
          </div>
        )}

        {/* Modal for Edit */}
        {buttonType === "edit" && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="md:w-2/5 w-4/5 space-y-5 bg-white m-auto p-5 rounded-lg"
          >
            <AvailabilityForm
              setIsOpen={setIsOpen}
              setUpdatedSlot={setUpdatedSlot}
              availability={slot}
              title="Edit Availability"
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default SlotCard;
