// src/components/ChatList.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function ChatList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    axios.get("https://mock-test.worthycodes.com/api/chatSystem/users/list")
      .then((res) => {
        console.log("API response:", res);
        setUsers(res.data || []);
        console.log("Users:", res.data);
        
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

   const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    

    <div className=" bg-white shadow-md rounded-md p-4  w-fit text-black">
        
        <input type="text" placeholder="Search Contact"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"/>

    
      {users.length === 0 ? (
        <p>No users loaded</p>
      ) : (
        <ul className="space-y-2">
          {filteredUsers.map((user) => (
            <li
              key={user.username}
              className="text-black p-2 rounded-md hover:bg-purple-400 cursor-pointer "
            >
              {user.username}
            </li>
          ))}
        </ul>
      )}
<div className="flex space-x-2 mt-4">
  <button type="button" className="!bg-purple-800 !text-white !px-4 !py-2 !rounded-md hover:!bg-purple-700"> Meeting </button>
  <button type="button" className="!bg-gray-100 hover:!bg-gray-200 text-black px-4 py-2 rounded-md " > Schedule </button>
</div>

    </div>
  );
}
