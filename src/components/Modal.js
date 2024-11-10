import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function Modal({ children, isOpen, setIsOpen }) {

  let location = useLocation();

  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleOpen = () => {
    if (location.pathname !== '/signin' && location.pathname !== '/signup') {
      setIsOpen(false);
    }
  };
  

  return (
    <div 
      onClick={handleOpen} 
      className={`bg-black bg-opacity-50 h-screen absolute top-0 left-0 w-full flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`}
    >
      {children}
    </div>
  );
}

export default Modal;
