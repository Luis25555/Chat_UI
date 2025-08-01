import { FaUserFriends, FaUsers, FaRegCalendarAlt, FaHome, FaCog} from "react-icons/fa";
import { PiBuildingOfficeDuotone,PiNewspaperClippingThin } from "react-icons/pi";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { GiSandsOfTime } from "react-icons/gi";
import { IoChatbubbleOutline } from "react-icons/io5";

export default function Sider() {
  return (
    
     <div className="fixed top-4 left-0 w-16 h-auto bg-purple-800 text-white flex flex-col items-center py-6 space-y-6 rounded-r-2xl shadow-lg z-50">
      <FaHome className="text-2xl cursor-pointer hover:text-blue-400" title="Home" />
      <PiBuildingOfficeDuotone className="text-3xl cursor-pointer hover:text-blue-400" title="Office" />
      <GiSandsOfTime className="text-3xl cursor-pointer hover:text-blue-400" title="Timer" />
      <MdOutlineLocalPostOffice className="text-3xl cursor-pointer hover:text-blue-400" title="Mail" />
      <PiNewspaperClippingThin className="text-3xl cursor-pointer hover:text-blue-400" title="Memo" />
      <FaRegCalendarAlt  className="text-2xl cursor-pointer hover:text-blue-400" title="Calendar" />
      <IoChatbubbleOutline className="text-2xl cursor-pointer hover:text-blue-400" title="Chat" />
      <FaCog  className="text-2xl cursor-pointer hover:text-blue-400" title="Cog" />
      <GrUserManager className="text-2xl cursor-pointer hover:text-blue-400" title="Person" />
    </div>
  );
}