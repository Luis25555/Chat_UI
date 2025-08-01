import { useEffect, useState } from "react";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { GiSandsOfTime } from "react-icons/gi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaHome, FaRegCalendarAlt, FaCog } from "react-icons/fa";
import { PiNewspaperClippingThin, PiBuildingOfficeDuotone } from "react-icons/pi";

export default function Sider({ onChatIconClick, showMobileProfile }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile && showMobileProfile) return null;

  return (
    <div className="fixed top-2 left-0 w-12 sm:w-14 md:w-16 h-auto bg-purple-800 text-white flex flex-col items-center py-4 sm:py-5 md:py-6 space-y-4 sm:space-y-5 md:space-y-6 rounded-r-2xl shadow-lg z-50">
      <FaHome className="text-2xl cursor-pointer hover:text-blue-400" title="Home" />
      <PiBuildingOfficeDuotone className="text-3xl cursor-pointer hover:text-blue-400" title="Office" />
      <GiSandsOfTime className="text-3xl cursor-pointer hover:text-blue-400" title="Timer" />
      <MdOutlineLocalPostOffice className="text-3xl cursor-pointer hover:text-blue-400" title="Mail" />
      <PiNewspaperClippingThin className="text-3xl cursor-pointer hover:text-blue-400" title="Memo" />
      <FaRegCalendarAlt className="text-2xl cursor-pointer hover:text-blue-400" title="Calendar" />
      <IoChatbubbleOutline
        className="text-2xl cursor-pointer hover:text-blue-400"
        title="Chat"
        onClick={onChatIconClick}
      />
      <FaCog className="text-2xl cursor-pointer hover:text-blue-400" title="Cog" />
      <GrUserManager className="text-2xl cursor-pointer hover:text-blue-400" title="Person" />
    </div>
  );
}