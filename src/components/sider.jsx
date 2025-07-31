import { FaUserFriends, FaUsers, FaCog } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-16 h-screen bg-gray-800 text-white flex flex-col items-center py-4 space-y-6">
      <FaUserFriends className="text-2xl cursor-pointer hover:text-blue-400" title="Users" />
      <FaUsers className="text-2xl cursor-pointer hover:text-blue-400" title="Groups" />
      <FaCog className="text-2xl mt-auto cursor-pointer hover:text-blue-400" title="Settings" />
    </div>
  );
}