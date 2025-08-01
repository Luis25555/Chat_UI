import React, { useState, useEffect } from 'react';

const User = ({ showProfile }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile && showProfile) return null;

  return (
    <div className="fixed bottom-1 left-2 flex flex-col items-center z-50 md:bottom-3 md:left-3">
      <div className="relative">
        <img
          src="/photos/Kevin.png"
          alt="Bob"
          className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-md"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 md:w-3.5 md:h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
      </div>
      <p className="mt-1 text-xs md:text-sm font-medium text-black">Bob</p>
    </div>
  );
};

export default User;
