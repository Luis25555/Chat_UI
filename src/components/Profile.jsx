import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { CiVideoOn } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";



export default function Profile({ userId, showMobileProfile, onCloseProfile }) {
  const [user, setUser] = useState(null);
  const [userGroups, setUserGroups] = useState([]);
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://mock-test.worthycodes.com/api/chatSystem/user/${userId}`
        );
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();

    const fetchUserGroups = async () => {
    try {
      const response = await axios.get("https://mock-test.worthycodes.com/api/chatSystem/groups/list");

      const groups = response.data;

      if (user?.id) {
        const filteredGroups = groups.filter(group =>
          group.users.includes(user.id)
        );
        setUserGroups(filteredGroups);
      }
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    }
  };

  fetchUserGroups();

  }, [userId]);

  if (!user) {
    return (
      null
    );
  }

if (window.innerWidth <= 768 && !showMobileProfile) {
  return null;
}
  

  return (
 <div
  className={`bg-white text-black p-4 rounded-2xl shadow-lg w-[300px] relative overflow-auto
    ${typeof window !== "undefined" && window.innerWidth <= 768 
      ? 'fixed top-0 left-0 w-full h-full z-50' 
      : 'h-[calc(100vh-2rem)] max-h-screen'}
  `}
>
  
  <button
    onClick={onCloseProfile}
    className=" absolute top-3 left-3 w-9 h-9 flex items-center justify-center text-2xl text-red-500  !rounded-full z-50 !bg-transparent !border-0  hover:!border-0 "
  >
    &times;
  </button>

  <div className="relative w-full flex justify-center mb-6">
    <img
      src={user.profileImage || "/photos/default.png"}
      alt={user.username}
      className="w-max h-max object-cover"
    />

    {/* Floating details box */}
    <div className="absolute w-[90%] bg-white shadow-md rounded-xl p-4 text-center -bottom-[20%]">
      <h2 className="text-lg font-semibold">{user.username}</h2>
      <p className="text-sm text-gray-500">{user.position}</p>
      <h2 className="text-black">{user.address}</h2>
      <div className="flex gap-1 justify-center items-center my-2 mx-0.5">
        <div className="w-10 h-10 rounded-full border-1 border-purple-400 bg-purple-100 flex items-center justify-center cursor-pointer hover:bg-purple-200 transition pt-0.5">
         <IoPersonAddOutline  className="text-xl text-purple-700 " title="Settings"/> 
           
        </div>
      <div className="w-10 h-10 rounded-full border-1 border-purple-400 bg-purple-100 flex items-center justify-center cursor-pointer hover:bg-purple-200 transition pt-0.5">
          <FaPhoneFlip className="text-xl text-purple-700 " title="Phone" />
           
        </div>
        <div className="w-10 h-10 rounded-full border-1 border-purple-400 bg-purple-100 flex items-center justify-center cursor-pointer hover:bg-purple-200 transition pt-0.5">
         <CiVideoOn className="text-xl text-purple-700 " title="Video"/> 
           
        </div>
        
        </div>
    </div>
    
  </div>

 
  <div className="w-full border-t border-gray-300 mt-12 pt-4 text-left">
    <div className="flex justify-between items-center mb-1">
    <h2 className="text-md font-semibold mb-2">User Information</h2>
    <IoMdInformationCircleOutline className=" text-2xl text-gray-300 cursor-pointer hover:text-gray-100"/>
    </div>
    <p className="font-semibold text-gray-500">Phone </p>
    <p className="font-semibold text-black">{user.phone}</p>
    <p className="font-semibold text-gray-500">Email </p>
    <p className="font-semibold text-black">{user.email}</p>
    
  </div>
  <div className="w-full border-t border-gray-300 mt-6 pt-4">
  <div className="flex justify-between items-center mb-2">
    <h2 className="text-md font-semibold">Group Participants</h2>
    <FaUsers className="text-lg text-gray-300 hover:text-gray-100 cursor-pointer" />
  </div>
  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
    {userGroups.length > 0 ? (
      userGroups.map(group => (
        <li key={group.id}
        className="flex items-center gap-3 p-2 rounded-md hover:bg-purple-400 cursor-pointer"
        ><div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold uppercase">
                {group.name.charAt(0)}
              </div>
              <span>{group.name}</span></li>
      ))
    ) : (
      <li className="text-gray-400 italic">Not in any groups</li>
    )}
  </ul>
</div>
<div className="w-full border-t border-gray-300 mt-6 pt-4">
    <div className="flex justify-between items-center mb-1">
    <h2 className="text-left font-semibold">Media</h2>
    <CiImageOn className=" text-2xl text-gray-400 cursor-pointer hover:text-gray-100"/>
    </div>
    <div className="flex gap-1 justify-center items-center my-2 mx-0.5 cursor-pointer">
    <img className="w-18 h-18 rounded-2xl" src="public\photos\1.png" alt="photo"></img>
    <img className="w-18 h-18 rounded-2xl" src="public\photos\2.png" alt="photo"></img>
    <img className="w-18 h-18 rounded-2xl" src="public\photos\3.png" alt="photo"></img>
    </div>
</div>

</div>
  );
}